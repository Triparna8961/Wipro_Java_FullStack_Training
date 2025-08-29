import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number = 0;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.customerId = +params['id'];
        this.loadCustomer(this.customerId);
      }
    });
  }

  loadCustomer(id: number): void {
    this.loading = true;
    this.customerService.getCustomerById(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customer', error);
        this.loading = false;
        Swal.fire('Error', 'Failed to load customer', 'error');
        this.router.navigate(['/customers']);
      }
    });
  }

  get f() { return this.customerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    const customer: Customer = this.customerForm.value;
    this.loading = true;

    if (this.isEditMode) {
      this.customerService.updateCustomer(this.customerId, customer).subscribe({
        next: () => {
          Swal.fire('Success', 'Customer updated successfully', 'success');
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          console.error('Error updating customer', error);
          this.loading = false;
          Swal.fire('Error', 'Failed to update customer', 'error');
        }
      });
    } else {
      this.customerService.createCustomer(customer).subscribe({
        next: () => {
          Swal.fire('Success', 'Customer created successfully', 'success');
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          console.error('Error creating customer', error);
          this.loading = false;
          Swal.fire('Error', 'Failed to create customer', 'error');
        }
      });
    }
  }
}