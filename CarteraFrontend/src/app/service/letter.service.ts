import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  private baseLetterURL = 'http://localhost:3000/api/letters';
  constructor(private http: HttpClient) { }

  insertLetterByUser(obj) {
    return this.http.post(`${this.baseLetterURL}`, obj)
  }
  getLettersByIDUser(idUser: number){
    return this.http.get(`${this.baseLetterURL}/user/${idUser}`);
  }
}
