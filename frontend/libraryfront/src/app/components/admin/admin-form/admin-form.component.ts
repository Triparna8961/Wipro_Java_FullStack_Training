import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
  adminForm: FormGroup;
  isEditMode = false;
  adminId: number = 0;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.adminForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['ADMIN', Validators.required],
      password: ['', this.isEditMode ? [] : Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.adminId = +params['id'];
        this.loadAdmin(this.adminId);
      }
    });
  }

  loadAdmin(id: number): void {
    this.loading = true;
    this.adminService.getAdminById(id).subscribe({
      next: (admin) => {
        this.adminForm.patchValue({
          username: admin.username,
          email: admin.email,
          role: admin.role
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading admin', error);
        this.loading = false;
        Swal.fire('Error', 'Failed to load admin', 'error');
        this.router.navigate(['/admins']);
      }
    });
  }

  get f() { return this.adminForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.adminForm.invalid) {
      return;
    }

    const admin: Admin = this.adminForm.value;
    this.loading = true;

    if (this.isEditMode) {
      this.adminService.updateAdmin(this.adminId, admin).subscribe({
        next: () => {
          Swal.fire('Success', 'Admin updated successfully', 'success');
          this.router.navigate(['/admins']);
        },
        error: (error) => {
          console.error('Error updating admin', error);
          this.loading = false;
          Swal.fire('Error', 'Failed to update admin', 'error');
        }
      });
    } else {
      this.adminService.createAdmin(admin).subscribe({
        next: () => {
          Swal.fire('Success', 'Admin created successfully', 'success');
          this.router.navigate(['/admins']);
        },
        error: (error) => {
          console.error('Error creating admin', error);
          this.loading = false;
          Swal.fire('Error', 'Failed to create admin', 'error');
        }
      });
    }
  }
}