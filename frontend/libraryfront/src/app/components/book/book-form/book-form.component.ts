import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/service/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  bookId: number = 0;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: [''],
      publishedDate: [''],
      totalCopies: [1, [Validators.required, Validators.min(1)]],
      availableCopies: [1, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookId = +params['id'];
        this.loadBook(this.bookId);
      }
    });
  }

  loadBook(id: number): void {
    this.loading = true;
    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publishedDate: book.publishedDate,
          totalCopies: book.totalCopies,
          availableCopies: book.availableCopies
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading book', error);
        this.loading = false;
        Swal.fire('Error', 'Failed to load book', 'error');
        this.router.navigate(['/books']);
      }
    });
  }

  get f() { return this.bookForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    const book: Book = {
      ...this.bookForm.value,
      status: this.bookForm.value.availableCopies > 0 ? 'AVAILABLE' : 'ISSUED'
    };

    this.loading = true;

    if (this.isEditMode) {
      this.bookService.updateBook(this.bookId, book).subscribe({
        next: () => {
          Swal.fire('Success', 'Book updated successfully', 'success');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error updating book', error);
          this.loading = false;
          Swal.fire('Error', 'Failed to update book', 'error');
        }
      });
    } else {
      this.bookService.createBook(book).subscribe({
        next: () => {
          Swal.fire('Success', 'Book created successfully', 'success');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error creating book', error);
          this.loading = false;
          Swal.fire('Error', 'Failed to create book', 'error');
        }
      });
    }
  }
}