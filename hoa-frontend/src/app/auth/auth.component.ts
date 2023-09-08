import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockDatabaseService } from '../Services/MockDataService';

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
    private formBuilder: FormBuilder,
    private mockDatabaseService: MockDatabaseService
  ) {
    // Initialize login and sign-up forms with form controls
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      // Form is valid, store user data in the mock database
      const { email, password } = this.signUpForm.value;
      this.mockDatabaseService.addUser(email, password);

      this.signUpForm.reset();
    }
  }
}
