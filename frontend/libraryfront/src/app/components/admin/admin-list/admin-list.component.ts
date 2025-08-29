import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  admins: Admin[] = [];
  loading = true;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAllAdmins().subscribe({
      next: (admins) => {
        this.admins = admins;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading admins', error);
        this.loading = false;
        Swal.fire('Error', 'Failed to load admins', 'error');
      }
    });
  }

  addAdmin(): void {
    this.router.navigate(['/admins/new']);
  }

  editAdmin(id: number): void {
    this.router.navigate(['/admins/edit', id]);
  }

  deleteAdmin(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteAdmin(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The admin has been deleted.', 'success');
            this.loadAdmins();
          },
          error: (error) => {
            console.error('Error deleting admin', error);
            Swal.fire('Error', 'Failed to delete admin', 'error');
          }
        });
      }
    });
  }
}