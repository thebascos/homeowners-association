import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HoService } from '../Services/ho.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  showLogIn: boolean = true;
  showSignUp: boolean = false;

  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private hoService: HoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Initialize login and sign-up forms with form controls
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      // Form is valid, store user data in the mock database
      const { name, email, password } = this.signUpForm.value;

      this.hoService.signUp$({ name, email, password }).subscribe(
        () => {
          this.signUpForm.reset();
          this.router.navigate(['/home']);
        },
        () => {
          console.log('error');
        }
      );
    }
  }
  logIn() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.hoService.login$({ email, password }).subscribe(
        (loggedIn) => {
          if (loggedIn) {
            this.loginForm.reset();
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          // Handle any errors that occurred during the login process
          console.error('Login error:', error);
        }
      );
    }
  }
}
