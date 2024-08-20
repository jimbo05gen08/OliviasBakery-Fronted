import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/register-model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  http = inject(HttpClient);

  saveUser(user: User): Observable<User> {
    return this.http.post<User>('https://localhost:7022/api/User/create', user);
  }

  public getUsers() {
    console.log('request');
    return this.http
      .get('https://localhost:7022/api/User/get')
      .subscribe((res) => console.log(res));
  }
}
