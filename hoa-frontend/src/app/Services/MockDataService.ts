import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDatabaseService {
  private users: any[] = [];

  addUser(email: string, password: string) {
    
    const existingUser = this.users.find(user => user.email === email);

    if (!existingUser) {
      const newUser = {
        email: email,
        password: password
      };
      this.users.push(newUser);
      console.log('User added:', newUser);
    } else {
      console.error('User with the same email already exists:', email);
    }
  }

 
}
