import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { BookIssueService } from 'src/app/service/book-issue.service';
import { BookService } from 'src/app/service/book.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalAdmins = 0;
  totalCustomers = 0;
  totalBooks = 0;
  totalBookIssues = 0;
  overdueBookIssues = 0;
  loading = true;

  constructor(
    private adminService: AdminService,
    private customerService: CustomerService,
    private bookService: BookService,
    private bookIssueService: BookIssueService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getAllAdmins().subscribe({
      next: (admins) => {
        this.totalAdmins = admins.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading admins', error);
        this.checkLoadingComplete();
      }
    });

    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.totalCustomers = customers.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading customers', error);
        this.checkLoadingComplete();
      }
    });

    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.totalBooks = books.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading books', error);
        this.checkLoadingComplete();
      }
    });

    this.bookIssueService.getAllBookIssues().subscribe({
      next: (bookIssues) => {
        this.totalBookIssues = bookIssues.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading book issues', error);
        this.checkLoadingComplete();
      }
    });

    this.bookIssueService.getOverdueBookIssues().subscribe({
      next: (overdueIssues) => {
        this.overdueBookIssues = overdueIssues.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading overdue book issues', error);
        this.checkLoadingComplete();
      }
    });
  }

  checkLoadingComplete(): void {
    // This is a simple way to check if all data has loaded
    // In a real application, you might want a more sophisticated approach
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}