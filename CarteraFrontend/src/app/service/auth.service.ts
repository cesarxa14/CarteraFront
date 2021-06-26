import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseAuthURL = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) { }

  login(usuario) {
    return this.http.post(`${this.baseAuthURL}/login`, usuario);
  }

  register(usuario) {
    return this.http.post(`${this.baseAuthURL}/register`, usuario);
  }
}
