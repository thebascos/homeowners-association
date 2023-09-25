// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userIsSignedIn = true;

    if (userIsSignedIn) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirect to the landing page
      return false;
    }
  }
}
