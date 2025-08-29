import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';
import { AdminFormComponent } from './components/admin/admin-form/admin-form.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer/customer-form/customer-form.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { BookFormComponent } from './components/book/book-form/book-form.component';
import { BookIssueListComponent } from './components/book-issue/book-issue-list/book-issue-list.component';
import { BookIssueFormComponent } from './components/book-issue/book-issue-form/book-issue-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'admins', 
    component: AdminListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'admins/new', 
    component: AdminFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'admins/edit/:id', 
    component: AdminFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'customers', 
    component: CustomerListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'customers/new', 
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'customers/edit/:id', 
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'books', 
    component: BookListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'books/new', 
    component: BookFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'books/edit/:id', 
    component: BookFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'book-issues', 
    component: BookIssueListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'book-issues/new', 
    component: BookIssueFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }