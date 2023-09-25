// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authenticated = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    // Initialize the authentication status based on the service
    this.authenticated = this.authService.isLoggedIn();
  }
}
