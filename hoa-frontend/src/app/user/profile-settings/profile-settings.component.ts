import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
import { EditUserDTO } from 'src/app/auth/dto/edit-user.dto';
import { HouseCode, SignUpDTO } from 'src/app/auth/dto/signupdto';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  errorMessage?: string;

  user: SignUpDTO = {
    name: '',
    email: '',
    password: '',
    houseCode: null,
  };

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private dialogRef: MatDialogRef<ProfileSettingsComponent>
  ) {}

  ngOnInit(): void {
    this.userService?.getUserProfile().subscribe(
      (user) => {
        this.user = user || {
          name: '',
          email: '',
          password: '',
          houseCode: null,
        };
      },
      (error) => {
        this.router.navigate(['/']);
      }
    );
  }

  onSubmit(): void {
    const updatedUser: EditUserDTO = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      houseCode: this.user.houseCode,
    };

    this.userService.editUser$(updatedUser).subscribe(
      (response) => {
        this.userService.getUserProfile().subscribe((user) => {
          this.sharedService.setUserProfile(user);
          this.dialogRef.close();
        });
      },
      (errorResponse) => {
        this.errorMessage = errorResponse.error.message;
      }
    );
  }
}
