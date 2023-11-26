// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { EditTicketDTO, TicketDTO } from '../auth/dto/ticket.dto';
import { GetInvoiceDTO, InvoiceDTO } from '../auth/dto/invoice.dto';
import {
  CreateProductDTO,
  EditProductDTO,
  ProductDTO,
} from '../auth/dto/product.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/user/profile`, { headers });
  }

  logoutUser$(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.baseUrl}/auth/logout`, null, {
      headers,
    });
  }

  editUser$(updatedUserData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.baseUrl}/auth/update`, updatedUserData, {
      headers,
    });
  }

  createTicket(ticketData: TicketDTO): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(
      `${this.baseUrl}/hos/create-ticket`,
      ticketData,
      {
        headers,
      }
    );
  }

  updateTicket$(
    ticketId: string,
    updatedTicketData: EditTicketDTO
  ): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('log out or something?');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(
      `${this.baseUrl}/hos/ticket/${ticketId}`,
      updatedTicketData,
      {
        headers,
      }
    );
  }

  getTickets(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/user/tickets`, { headers });
  }
  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/auth/users`, { headers });
  }
  getInvoices(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/user/invoice`, { headers });
  }

  createInvoice(invoiceDTO: InvoiceDTO): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(
      `${this.baseUrl}/hos/create-invoice`,
      invoiceDTO,
      {
        headers,
      }
    );
  }

  createProduct(productData: CreateProductDTO): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(
      `${this.baseUrl}/hos/create-product`,
      productData,
      {
        headers,
      }
    );
  }
  getProducts(allProducts?: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams();
    if (allProducts) {
      params = params.set('allProducts', allProducts);
    }

    const products = this.http.get<any>(`${this.baseUrl}/auth/products`, {
      headers,
      params,
    });
    return products;
  }

  updateProduct$(
    producId: string,
    updatedPropductData: EditProductDTO
  ): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('log out or something?');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('inside the service: ', updatedPropductData);

    return this.http.put<any>(
      `${this.baseUrl}/hos/products/${producId}`,
      updatedPropductData,
      {
        headers,
      }
    );
  }

  createPaymentIntent(paymentData: GetInvoiceDTO): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.baseUrl}/hos/payment`, paymentData, {
      headers,
    });
  }

  createCheckoutSession(invoice: GetInvoiceDTO): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(
      `${this.baseUrl}/hos/create-checkout-session`,
      invoice,
      {
        headers,
      }
    );
  }
}
