import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'skip': 'true'
    }
  )
}
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  getImageByName(image:string):Observable<any>{
    return this.http.get("http://localhost:8080/get/image/info/"+image);
  }

  uploadImage(imageData:FormData):Observable<any>{
    return this.http.post("http://localhost:8080/upload/image/",imageData,httpOptions);
  }
}
