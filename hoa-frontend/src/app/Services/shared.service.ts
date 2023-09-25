import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from './user.service';
import { SignUpDTO } from '../auth/dto/signupdto';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userProfileSubject = new BehaviorSubject<SignUpDTO | undefined>(
    undefined
  );

  constructor(private userService: UserService) {
    this.userService.getUserProfile().subscribe((user) => {
      this.userProfileSubject.next(user);
    });
  }

  getUserProfile(): Observable<SignUpDTO | undefined> {
    return this.userProfileSubject.asObservable();
  }

  setUserProfile(userProfile: SignUpDTO): void {
    this.userProfileSubject.next(userProfile);
  }
}
