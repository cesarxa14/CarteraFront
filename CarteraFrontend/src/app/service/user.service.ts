import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUserURL = 'http://localhost:3000/api/users';
  private baseAuthURL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  getUserByID(idUser){
    return this.http.get(`${this.baseUserURL}/${idUser}`)
  }

  updateUser(userUpdated, idUser){
    return this.http.put(`${this.baseAuthURL}/${idUser}`, userUpdated);
  }

  deleteUser(idUser){
    return this.http.delete(`${this.baseUserURL}/${idUser}`);
  }
}
