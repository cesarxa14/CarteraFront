import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUserURL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  updateUser(userUpdated){
    return this.http.put(`${this.baseUserURL}`, userUpdated);
  }

  deleteUser(idUser){
    return this.http.delete(`${this.baseUserURL}/${idUser}`);
  }
}
