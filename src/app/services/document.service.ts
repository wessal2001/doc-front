import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environment/environment';
import { Document } from '../models/Document';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { Metadata } from '../models/Metadata';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  parsedDate!:String;

  constructor(private http: HttpClient) {}
 
  getListDocs(): Observable<Document[]> {
    return this.http.get<Document[]>(environment.apiUrls.doc);
  }
  getUserDocs(idUser:number): Observable<Document[]> {
    return this.http.get<Document[]>(`${environment.apiUrls.doc}` + `/docs/${idUser}`);
  }
  addDoc(file:FormData): Observable<any> {
    return this.http.post(
      `${environment.apiUrls.doc}` + `/addDocument`, file
    );
  }
  deleteDocument(idDoc: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrls.doc}` + `/deletedoc/${idDoc}`,{ responseType: 'text' }
    );
  }
  saveMetadata(metadata:Metadata){
    return this.http.post(
      `${environment.apiUrls.metadata}` , metadata
    );
  }
 
  deleteData(idDoc: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrls.metadata}` + `/deletedata/${idDoc}`,{ responseType: 'text' }
    );
  }
  downloadDocument(documentId: number,fileName:string) {
    this.http.get(`${environment.apiUrls.doc}/${documentId}/download`, {
      responseType: 'blob' // Specify that the response type is a binary blob
    }).subscribe((data: Blob) => {
      // Save the blob data as a file with the given filename
      saveAs(data, fileName);
    }, error => {
      // Handle error
      console.error('Error downloading file:', error);
    });
  }
  filterDocs(doc:Document):Observable<Document[]> {
    const url = `${environment.apiUrls.doc}/getByCriteria`;
    return this.http.post<Document[]>(url,doc);
  }
  }


