import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autorisation } from '../models/Autorisation';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  constructor(private http:HttpClient) { }
  grantAutority(autority:Autorisation): Observable<Object> {
    return this.http.post(
      environment.apiUrls.autority, autority
    );
  }
  getDocAuthority(idDoc:number,idUser:number):Observable<Autorisation[]>{
    return this.http.get<Autorisation[]>(environment.apiUrls.auth+"/"+idDoc+"/"+idUser);
  }
  getAuthoritiesByUserAndDoc(documentId:number,userId:number):Observable<Autorisation[]>{
    return this.http.get<Autorisation[]>(`${environment.apiUrls.autority}` + `/doc-authorities/${documentId}/${userId}`);
  }
}
