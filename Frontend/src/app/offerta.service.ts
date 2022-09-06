import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offerta } from './offerta';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticationService } from './auth.service';
import { RequestOfferta } from './util/request-offerta';
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
export class OffertaService {
  private baseUrl = 'http://localhost:8080/offerte';



  constructor(private http:HttpClient,private auth:AuthenticationService) { }

  getOfferteList(pageSize:number,pageIndex:number):Observable<any>{
    return this.http.get<Offerta[]>(`${this.baseUrl}`+"?pageNumber="+pageIndex+"&pageSize="+pageSize);
  }

  getOfferteSearch(regione:string,provincia:string,comune:string,postiLetto:number):Observable<any>{
    return this.http.get<Offerta[]>("http://localhost:8080/offerte/search?regione="+regione+"&provincia="+provincia+"&comune="+comune+"&postiLetto="+postiLetto);
  }

  getOffertebyUser():Observable<any>{
    let email = this.auth.getLoggedInUserName();
    return this.http.get<Offerta[]>(this.baseUrl+"/user?email="+email);
  }

  createOfferta(requestOfferta:RequestOfferta):Observable<any>{
      return this.http.post<Offerta>(this.baseUrl+"/create",requestOfferta,httpOptions);
  }

  deleteOfferta(offerta:Offerta):Observable<any>{
    return this.http.post(this.baseUrl+"/delete",offerta,httpOptions);
  }
}
