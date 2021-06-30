import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private baseUserURL     = 'http://localhost:3000/users';
  private baseCarterasURL = 'http://localhost:3000/carteras';
  private baseLetraURL    = 'http://localhost:3000/letras';
  private baseExpenseURL = 'http://localhost:3000/api/expense';

  public letrasList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  login(username, password) {
    return this.http.get(`${this.baseUserURL}?username=${username}&password=${password}`);
  }

  register(user) {
    return this.http.post(`${this.baseUserURL}`, user);
  }
  createExpense(obj) {
    return this.http.post(this.baseExpenseURL, obj);
  }

  getCarterasByUser(idUser){
    return this.http.get(`${this.baseCarterasURL}?id_user=${idUser}`);
  }

  getCarterasByID(idCartera){
    return this.http.get(`${this.baseCarterasURL}/${idCartera}`);
  }

  getLetrasByIDCartera(idCartera){
    return this.http.get(`${this.baseLetraURL}?idCartera=${idCartera}`);
  }

  getLetrasByIDUser(idUser){
    return this.http.get(`${this.baseLetraURL}?idUser=${idUser}`);
  }

  insertLetraByIDCartera(obj, idCartera){
    return this.http.post(`${this.baseLetraURL}?id_cartera=${idCartera}`, obj);
  }

  insertLetraByIDUser(obj, idUser){
    return this.http.post(`${this.baseLetraURL}?idUser=${idUser}`, obj);
  }

  getUserByUsername(username){
    return this.http.get(`${this.baseUserURL}?username=${username}`);
  }

}
