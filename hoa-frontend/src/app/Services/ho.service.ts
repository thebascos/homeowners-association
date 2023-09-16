import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpDTO } from '../auth/dto/signupdto';
import { map } from 'rxjs';
import { LogInDTO } from '../auth/dto/logindto';

@Injectable({
  providedIn: 'root',
})
export class HoService {
  userIsSignedIn: boolean = false;
  constructor(readonly HttPClient: HttpClient) {}

  public signUp$(signUpDTO: SignUpDTO) {
    this.userIsSignedIn = true;
    return this.HttPClient.post<{ access_token: string }>(
      'http://localhost:3000/auth/signup',
      signUpDTO
    ).pipe(
      map((response) => {
        return response.access_token;
      })
    );
  }
  public login$(loginDTO: LogInDTO) {
    return this.HttPClient.post<{ access_token: string }>(
      'http://localhost:3000/auth/login',
      loginDTO
    ).pipe(
      map((response) => {
        return response.access_token;
      })
    );
  }
}
