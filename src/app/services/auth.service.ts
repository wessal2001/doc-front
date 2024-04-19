import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from '../environment/environment';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: String, password: String):Observable<User> {
    return this.http.get<User>(environment.apiUrls.auth+"/signin/"+username)
  }
  register(user:any):Observable<Object>{
    return this.http.post(environment.apiUrls.auth,user);

  }
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(environment.apiUrls.auth);
  }
  
}
