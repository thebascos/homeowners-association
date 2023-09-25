import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedIn = false;

  constructor() {
    // Check for token in localStorage during service initialization
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true; // User is authenticated
    }
  }

  // ... rest of your AuthenticationService code ...

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
