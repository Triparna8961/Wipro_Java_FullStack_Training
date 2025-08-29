import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  loading = true;
  searchTerm = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.filteredCustomers = customers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customers', error);
        this.loading = false;
        Swal.fire('Error', 'Failed to load customers', 'error');
      }
    });
  }

  searchCustomers(): void {
    if (!this.searchTerm) {
      this.filteredCustomers = this.customers;
      return;
    }

    this.customerService.searchCustomersByName(this.searchTerm).subscribe({
      next: (customers) => {
        this.filteredCustomers = customers;
      },
      error: (error) => {
        console.error('Error searching customers', error);
        Swal.fire('Error', 'Failed to search customers', 'error');
      }
    });
  }

  addCustomer(): void {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(id: number): void {
    this.router.navigate(['/customers/edit', id]);
  }

  deleteCustomer(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The customer has been deleted.', 'success');
            this.loadCustomers();
          },
          error: (error) => {
            console.error('Error deleting customer', error);
            Swal.fire('Error', 'Failed to delete customer', 'error');
          }
        });
      }
    });
  }
}