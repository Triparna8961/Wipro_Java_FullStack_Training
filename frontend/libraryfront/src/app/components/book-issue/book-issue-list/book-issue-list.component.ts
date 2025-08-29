import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookIssue } from 'src/app/models/book-issue.model';
import { BookIssueService } from 'src/app/service/book-issue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-issue-list',
  templateUrl: './book-issue-list.component.html',
  styleUrls: ['./book-issue-list.component.css']
})
export class BookIssueListComponent implements OnInit {
  bookIssues: BookIssue[] = [];
  filteredBookIssues: BookIssue[] = [];
  loading = true;
  showOverdueOnly = false;

  constructor(
    private bookIssueService: BookIssueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBookIssues();
  }

  loadBookIssues(): void {
    this.loading = true;
    
    if (this.showOverdueOnly) {
      this.bookIssueService.getOverdueBookIssues().subscribe({
        next: (bookIssues) => {
          this.bookIssues = bookIssues;
          this.filteredBookIssues = bookIssues;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading overdue book issues', error);
          this.loading = false;
          Swal.fire('Error', 'Failed to load overdue book issues', 'error');
        }
      });
    } else {
      this.bookIssueService.getAllBookIssues().subscribe({
        next: (bookIssues) => {
          this.bookIssues = bookIssues;
          this.filteredBookIssues = bookIssues;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading book issues', error);
          this.loading = false;
          Swal.fire('Error', 'Failed to load book issues', 'error');
        }
      });
    }
  }

  toggleOverdueOnly(): void {
    this.showOverdueOnly = !this.showOverdueOnly;
    this.loadBookIssues();
  }

  addBookIssue(): void {
    this.router.navigate(['/book-issues/new']);
  }

  returnBook(bookIssueId: number): void {
    Swal.fire({
      title: 'Return Book',
      text: 'Are you sure you want to return this book?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, return it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookIssueService.returnBook(bookIssueId).subscribe({
          next: (updatedBookIssue) => {
            Swal.fire('Success', 'Book returned successfully', 'success');
            this.loadBookIssues();
          },
          error: (error) => {
            console.error('Error returning book', error);
            Swal.fire('Error', 'Failed to return book', 'error');
          }
        });
      }
    });
  }

  isOverdue(bookIssue: BookIssue): boolean {
    if (bookIssue.status === 'RETURNED') {
      return false;
    }
    return bookIssue.dueDate ? new Date() > new Date(bookIssue.dueDate) : false;
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString();
  }
}