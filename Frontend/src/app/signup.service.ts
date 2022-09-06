import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { RequestRegistration } from './util/request-registration';
import { retry, catchError } from 'rxjs/operators';
import { Profugo } from './profugo';
import { Offerente } from './offerente';
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
export class SignupService {

  private baseUrl = "http://localhost:8080";
  private profugoUrl = "/profugo";
  private offerenteUrl = "/offerente";

  constructor(private http: HttpClient) { }

  register(requestRegistrationDTO:RequestRegistration):Observable<any>{
    if(requestRegistrationDTO.getRuolo()==="profugo"){
      return this.http.post<Profugo>(this.baseUrl+this.profugoUrl,requestRegistrationDTO,httpOptions);
    }
    else{
      return this.http.post<Offerente>(this.baseUrl+this.offerenteUrl,requestRegistrationDTO,httpOptions);
    }
  }

  handleError(error:any) {    
    let errorMessage = `Error Code: ${error.status} - ${error.error.error} \nMessage: ${error.error.message}`;
    return throwError(() => new Error(errorMessage));
  }
}
