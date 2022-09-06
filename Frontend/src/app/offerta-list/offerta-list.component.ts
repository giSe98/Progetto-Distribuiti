import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Offerta } from '../offerta';
import { OffertaService } from '../offerta.service';
import { AuthenticationService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RicercaService } from './ricerca.service';
import { Regione } from '../util/regione';
import {map, startWith} from 'rxjs/operators';
import { Province } from '../util/province';
import { MatSelectChange } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Comune } from '../util/comune';
import { ResponseData } from '../util/response';


@Component({
  selector: 'app-offerta-list',
  templateUrl: './offerta-list.component.html',
  styleUrls: ['./offerta-list.component.css']
})
export class OffertaListComponent implements OnInit {
  
  offerte: Offerta[];
  public datasource: any;
  public pageIndex=0;
  public pageSize=10;
  public length=100;
  public pageEvent: PageEvent;
  public isLoggedIn = false;
  filteredOptions: Observable<Regione[]>;
  filteredOptionsP: Observable<Province[]>;
  filteredOptionsC: Observable<Comune[]>;

  @ViewChild(MatPaginator) paginator:MatPaginator;

  atLeastOne = (validator: ValidatorFn, controls:string[] = []) => (
    group: FormGroup,
  ): ValidationErrors | null => {
    if(!controls){
      controls = Object.keys(group.controls)
    }
    let hasAtLeastOne = group && group.controls && controls
      .some(k => !validator(group.controls[k]));
    return hasAtLeastOne ? null : {
      atLeastOne: true,
    };
  };

  
  ricerca: FormGroup = this.formBuilder.group({
    regione: new FormControl('',[]),
    citta: new FormControl('',[]),
    comune: new FormControl('',[]),
    postiLetto:new FormControl('',[Validators.pattern("^[0-9][A-Za-z0-9 -]*$")])
  },{ validator: this.atLeastOne(Validators.required, ['regione','postiLetto'])  });

  comune = "";
  provincia = "";
  regione = "";
  regioni: Regione[];
  province: Province[];
  comuni: Comune[];
  constructor(private formBuilder: FormBuilder,private ricercaService: RicercaService ,private offertaService:OffertaService, private authService: AuthenticationService) { 
      this.regioni = this.ricercaService.getRegioni();
      this.province = this.ricercaService.getProvince();
      this.comuni = this.ricercaService.getComuni();
      //console.log(this.province);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.ricerca.get('citta')?.disable();
    this.ricerca.get('comune')?.disable();
    //this.filteredOptionsP = this.ricerca.get('citta')!.valueChanges.pipe(startWith(''),map(value2 => this._filterP(value2 || '')));
    this.filteredOptions = this.ricerca.get('regione')!.valueChanges.pipe(startWith(''),map(value => this._filterR(value || '')));
    //this.filteredOptionsC = this.ricerca.get('comune')!.valueChanges.pipe(startWith(''),map(value => this._filterC(value || '')));
    this.getResource();
  }
  
  private _filterR(value: string): Regione[] {
    //console.log(value);
    const filterValue = value.toLowerCase();
    //this.ricerca.get('citta')?.enable();
    return this.regioni.filter(regione => regione.nome.toLocaleLowerCase().includes(filterValue));
  }
  
  private _filterP(value: string): Province[] {
    //console.log(value);
    const filterValue = value.toLowerCase();
    //console.log(this.province.filter(provincia => provincia.nome.toLocaleLowerCase().includes(filterValue)));
    return this.province.filter(provincia => provincia.nome.toLocaleLowerCase().includes(filterValue));
  }

  private _filterC(value: string): Comune[] {
    //console.log(value);
    const filterValue = value.toLowerCase();
    //console.log(this.province.filter(provincia => provincia.nome.toLocaleLowerCase().includes(filterValue)));
    return this.comuni.filter(comune => comune.nome.toLocaleLowerCase().includes(filterValue));
  }
  reloadData(event:PageEvent): void{
    console.log(event);
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.pageSize=event.pageSize;
    this.pageIndex=event.pageIndex;
    this.getResource();
}
  getLoggedIn(){
    return this.authService.getLoggedInUserName();
  }
  getResource(){
    //console.log(this.pageSize);
    this.offertaService.getOfferteList(this.pageSize,this.pageIndex).subscribe(offerte => this.offerte = offerte);
    this.datasource=this.offerte;
  }
  selectOption(optionChangedEvent: MatOptionSelectionChange) {
    console.log(optionChangedEvent);
    if(optionChangedEvent.isUserInput){
      this.filteredOptionsP = this.ricerca.get('citta')!.valueChanges.pipe(startWith(''),map(value2 => this._filterP(value2 || '')));
      this.regione = optionChangedEvent.source.value;

      this.provincia = "";
      this.comune = "";

      this.ricerca.get('citta')?.reset();
      this.ricerca.get('comune')?.reset();

      this.province = this.ricercaService.getProvince();

      const r = this.regioni.filter(regione => regione.nome.includes(optionChangedEvent.source.value));
      this.province = this.province.filter(provincia => provincia.id_regione === r[0].id);
      console.log(this.regioni);
      this.ricerca.get('citta')?.enable();
    }
  }
  selectOptionP(optionChangedEvent: MatOptionSelectionChange){
    if(optionChangedEvent.isUserInput){
      this.filteredOptionsC = this.ricerca.get('comune')!.valueChanges.pipe(startWith(''),map(value => this._filterC(value || '')));
      this.provincia=optionChangedEvent.source.value
      this.comune="";
      this.ricerca.get('comune')?.reset();
      this.comuni = this.ricercaService.getComuni();
      const r = this.province.filter(provincia => provincia.nome.includes(optionChangedEvent.source.value));
      this.comuni = this.comuni.filter(comune => comune.id_provincia === r[0].id);
      console.log(this.comuni);
      this.ricerca.get('comune')?.enable();
    }
  }
  selectOptionC(optionChangedEvent:MatOptionSelectionChange){
    if(optionChangedEvent.isUserInput){
      this.comune=optionChangedEvent.source.value;
    }
  }
  performSearch(){
    this.offertaService.getOfferteSearch(this.regione,this.provincia,this.comune,this.ricerca.value.postiLetto).subscribe(offerte => this.offerte = offerte);
    this.datasource=this.offerte;
  }

}
