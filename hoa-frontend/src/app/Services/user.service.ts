// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

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
}
