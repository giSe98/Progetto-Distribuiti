import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Regione } from '../util/regione';
import _regioni from './regioni.json';
import _province from './province.json';
import _comuni from './comuni.json';
import { Province } from '../util/province';
import { Comune } from '../util/comune';

@Injectable({
  providedIn: 'root'
})
export class RicercaService {
  url:string = "https://raw.githubusercontent.com/napolux/italia/master/json/regioni.json";

  constructor(private http:HttpClient) { }

  getRegioni(){
    return _regioni as unknown as Regione[];
  }
  getProvince(){
    return _province as unknown as Province[];
  }
  getComuni(){
    return _comuni as unknown as Comune[];
  }
}
