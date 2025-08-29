import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Customer } from 'src/app/models/customer.model';
import { BookIssueService } from 'src/app/service/book-issue.service';
import { BookService } from 'src/app/service/book.service';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-issue-form',
  templateUrl: './book-issue-form.component.html',
  styleUrls: ['./book-issue-form.component.css']
})
export class BookIssueFormComponent implements OnInit {
  bookIssueForm: FormGroup;
  books: Book[] = [];
  customers: Customer[] = [];
  loading = false;
  submitted = false;
  minDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private bookIssueService: BookIssueService,
    private bookService: BookService,
    private customerService: CustomerService,
    public router: Router
  ) {
    this.bookIssueForm = this.formBuilder.group({
      bookId: ['', Validators.required],
      customerId: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
    
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadCustomers();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books.filter(book => book.status === 'AVAILABLE');
      },
      error: (error) => {
        console.error('Error loading books', error);
        Swal.fire('Error', 'Failed to load books', 'error');
      }
    });
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        console.error('Error loading customers', error);
        Swal.fire('Error', 'Failed to load customers', 'error');
      }
    });
  }

  get f() { return this.bookIssueForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookIssueForm.invalid) {
      return;
    }

    const { bookId, customerId, dueDate } = this.bookIssueForm.value;
    this.loading = true;

    this.bookIssueService.issueBook(+bookId, +customerId, new Date(dueDate)).subscribe({
      next: () => {
        Swal.fire('Success', 'Book issued successfully', 'success');
        this.router.navigate(['/book-issues']);
      },
      error: (error) => {
        console.error('Error issuing book', error);
        this.loading = false;
        Swal.fire('Error', 'Failed to issue book', 'error');
      }
    });
  }
}