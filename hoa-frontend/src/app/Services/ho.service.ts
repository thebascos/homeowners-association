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

  public signUp$(signUp: SignUpDTO) {
    this.userIsSignedIn = true;
    return this.HttPClient.post('http://localhost:3000/auth/signup', signUp);
  }
  public login$(loginDTO: LogInDTO) {
    // Assuming your server returns a boolean result for login success
    return this.HttPClient.post<boolean>(
      'http://localhost:3000/auth/login',
      loginDTO
    ).pipe(
      map((response: boolean) => {
        this.userIsSignedIn = response;
        return response;
      })
    );
  }
}
