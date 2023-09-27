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
            localStorage.setItem('token', token);
            this.loginForm.reset();
            this.dialogRef.close();
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
