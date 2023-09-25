import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private dialog: MatDialog) {}

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'my-class',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignupComponent, {
      panelClass: 'my-class',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
