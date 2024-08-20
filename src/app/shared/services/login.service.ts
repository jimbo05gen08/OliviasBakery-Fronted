import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/register-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);

  loginUser(user: User): Observable<User> {
    return this.http.post<User>('https://localhost:7022/api/User/login', user);
  }
}
