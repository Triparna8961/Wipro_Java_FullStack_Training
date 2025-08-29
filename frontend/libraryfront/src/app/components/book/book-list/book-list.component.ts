import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/service/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  loading = true;
  searchTerm = '';
  searchType = 'title';

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading books', error);
        this.loading = false;
        Swal.fire('Error', 'Failed to load books', 'error');
      }
    });
  }

  searchBooks(): void {
    if (!this.searchTerm) {
      this.filteredBooks = this.books;
      return;
    }

    if (this.searchType === 'title') {
      this.bookService.searchBooksByTitle(this.searchTerm).subscribe({
        next: (books) => {
          this.filteredBooks = books;
        },
        error: (error) => {
          console.error('Error searching books by title', error);
          Swal.fire('Error', 'Failed to search books', 'error');
        }
      });
    } else if (this.searchType === 'author') {
      this.bookService.searchBooksByAuthor(this.searchTerm).subscribe({
        next: (books) => {
          this.filteredBooks = books;
        },
        error: (error) => {
          console.error('Error searching books by author', error);
          Swal.fire('Error', 'Failed to search books', 'error');
        }
      });
    }
  }

  addBook(): void {
    this.router.navigate(['/books/new']);
  }

  editBook(id: number): void {
    this.router.navigate(['/books/edit', id]);
  }

  deleteBook(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this book!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The book has been deleted.', 'success');
            this.loadBooks();
          },
          error: (error) => {
            console.error('Error deleting book', error);
            Swal.fire('Error', 'Failed to delete book', 'error');
          }
        });
      }
    });
  }
}