import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from './user.service';
import { SignUpDTO } from '../auth/dto/signupdto';
import { TicketDTO } from '../auth/dto/ticket.dto';
import { GetInvoiceDTO } from '../auth/dto/invoice.dto';
import { ProductDTO } from '../auth/dto/product.dto';

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
  private invoiceSubject = new BehaviorSubject<GetInvoiceDTO[] | undefined>(
    undefined
  );

  private productSubject = new BehaviorSubject<ProductDTO[] | undefined>(
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
    this.userService.getInvoices().subscribe((invoices) => {
      this.invoiceSubject.next(invoices);
    });
    this.userService.getProducts().subscribe((products) => {
      this.invoiceSubject.next(products);
    });
  }

  getUserProfile(): Observable<SignUpDTO | undefined> {
    return this.userProfileSubject.asObservable();
  }
  getInvoices(): Observable<GetInvoiceDTO[] | undefined> {
    return this.invoiceSubject.asObservable();
  }
  getProducts(): Observable<ProductDTO[] | undefined> {
    return this.productSubject.asObservable();
  }
  updateInvoices(newInvoices: GetInvoiceDTO[]): void {
    this.invoiceSubject.next(newInvoices);
  }
  updateProducts(newProducts: ProductDTO[]): void {
    this.productSubject.next(newProducts);
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
