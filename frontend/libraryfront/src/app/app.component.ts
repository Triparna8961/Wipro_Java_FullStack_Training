import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Library Management System';
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {
    // Listen to router events to update authentication state
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUser = this.authService.getCurrentUser();
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.currentUser = null;
  }
}
