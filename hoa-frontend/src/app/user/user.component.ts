import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { SignUpDTO } from '../auth/dto/signupdto';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../Services/shared.service';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  user?: SignUpDTO;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getUserProfile().subscribe((user) => {
      this.user = user;
    });
  }
  openConfirmDialog(): void {
    const dialogRef = this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: 'Are you sure you want to log out?',
        },
      })
      .afterClosed()
      .pipe(
        filter((ifYes) => {
          return ifYes;
        }),
        switchMap(() => {
          return this.userService.logoutUser$();
        })
      )
      .subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      });
  }

  openProfileSettings(): void {
    const dialogRef = this.dialog.open(ProfileSettingsComponent, {});

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
