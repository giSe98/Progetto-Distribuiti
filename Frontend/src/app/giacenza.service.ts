import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { Giacenza } from './giacenza';
import { RequestGiacenza } from './util/request-giacenza';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type' : 'application/json'
    }
  )
}
@Injectable({
  providedIn: 'root'
})
export class GiacenzaService {
  private baseUrl = 'http://localhost:8080/giacenza';

  constructor(private http:HttpClient,private auth:AuthenticationService) { }

  getGiacenzaByUser():Observable<any>{
    let email = this.auth.getLoggedInUserName();
    return this.http.get<Giacenza[]>(this.baseUrl+"/user?email="+email);
  }

  createGiacenza(requestGiacenza:RequestGiacenza):Observable<any>{
    return this.http.post<Giacenza>(this.baseUrl+"/register",requestGiacenza,httpOptions);
  }

  deleteGiacenza(giacenza:Giacenza):Observable<any>{
    return this.http.post(this.baseUrl+"/delete",giacenza,httpOptions);
  }
  terminaGiacenza(giacenza:Giacenza):Observable<any>{
    return this.http.post(this.baseUrl+"/termina",giacenza,httpOptions);
  }
  modificaGiacenza(giacenza:Giacenza):Observable<any>{
    return this.http.post(this.baseUrl+"/modifica",giacenza,httpOptions);
  }
}
