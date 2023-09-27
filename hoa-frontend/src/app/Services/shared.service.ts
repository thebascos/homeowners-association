import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from './user.service';
import { SignUpDTO } from '../auth/dto/signupdto';
import { TicketDTO } from '../auth/dto/ticket.dto';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userProfileSubject = new BehaviorSubject<SignUpDTO | undefined>(
    undefined
  );

  // Create a BehaviorSubject for tickets
  private ticketsSubject = new BehaviorSubject<TicketDTO[] | undefined>(
    undefined
  );

  constructor(private userService: UserService) {
    this.userService.getUserProfile().subscribe((user) => {
      this.userProfileSubject.next(user);
    });

    // Fetch and set initial tickets when the service is created
    this.userService.getTickets().subscribe((tickets) => {
      this.ticketsSubject.next(tickets);
    });
  }

  getUserProfile(): Observable<SignUpDTO | undefined> {
    return this.userProfileSubject.asObservable();
  }

  setUserProfile(userProfile: SignUpDTO): void {
    this.userProfileSubject.next(userProfile);
  }

  getTickets(): Observable<TicketDTO[] | undefined> {
    return this.ticketsSubject.asObservable();
  }

  updateTickets(newTickets: TicketDTO[]): void {
    this.ticketsSubject.next(newTickets);
  }
}
