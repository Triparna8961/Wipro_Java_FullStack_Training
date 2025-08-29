import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { AdminService } from './service/admin.service';
import { CustomerService } from './service/customer.service';
import { BookService } from './service/book.service';
import { BookIssueService } from './service/book-issue.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminListComponent,
    AdminFormComponent,
    CustomerListComponent,
    CustomerFormComponent,
    BookListComponent,
    BookFormComponent,
    BookIssueListComponent,
    BookIssueFormComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AdminService,
    CustomerService,
    BookService,
    BookIssueService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
