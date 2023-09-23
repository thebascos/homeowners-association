import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HoService } from 'src/app/Services/ho.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage?: string;

  @Output() loginSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private hoService: HoService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.hoService.login$({ email, password }).subscribe(
        (token) => {
          if (token) {
            console.log(token);
            // Store the token securely, e.g., in local storage
            localStorage.setItem('token', token);

            // Emit a successful login event
            this.loginSuccess.emit(true);

            // Reset the form and close the dialog
            this.loginForm.reset();
            this.dialogRef.close();

            // Redirect the user to the desired page (e.g., '/home')
            this.router.navigate(['/home']);
          }
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.message;
          this.loginForm.reset();
        }
      );
    }
  }
}
