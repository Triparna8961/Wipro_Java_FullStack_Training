import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() currentUser: any;
  @Output() logout = new EventEmitter<void>();

  constructor() { }

  onLogout(): void {
    this.logout.emit();
  }
}