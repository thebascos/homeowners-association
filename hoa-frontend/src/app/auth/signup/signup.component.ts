import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HoService } from 'src/app/Services/ho.service';
import { HouseCode } from '../dto/signupdto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signUpForm: FormGroup;
  errorMessage?: string;
  houseCodes = HouseCode;

  constructor(
    private hoService: HoService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SignupComponent>,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      houseCode: ['', Validators.required],
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const { name, email, password, houseCode } = this.signUpForm.value;
      this.hoService.signUp$({ name, email, password, houseCode }).subscribe(
        (token) => {
          if (token) {
            localStorage.setItem('token', token);
            this.signUpForm.reset();
            this.dialogRef.close(); // Close the signup dialog
            this.router.navigate(['/home']);
          }
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.message;
          this.signUpForm.reset();
        }
      );
    }
  }
}
