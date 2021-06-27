import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseAuthURL = 'http://localhost:3000/api/auth';
  private tipoCambioAPI = 'https://api.apis.net.pe/v1/tipo-cambio-sunat';
  constructor(private http: HttpClient) { }

  login(usuario) {
    return this.http.post(`${this.baseAuthURL}/login`, usuario);
  }

  register(usuario) {
    return this.http.post(`${this.baseAuthURL}/register`, usuario);
  }

  getTipoCambio(){
    return this.http.get(`${this.baseAuthURL}/tipoCambio`);
  }
}
