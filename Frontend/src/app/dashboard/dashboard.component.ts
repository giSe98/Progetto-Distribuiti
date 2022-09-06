import { CommaExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, startWith } from 'rxjs';
import { AuthenticationService } from '../auth.service';
import { Giacenza } from '../giacenza';
import { GiacenzaService } from '../giacenza.service';
import { Offerta } from '../offerta';
import { RicercaService } from '../offerta-list/ricerca.service';
import { OffertaService } from '../offerta.service';
import { ConfirmationDialogComponent } from '../sharepage/confirmation-dialog/confirmation-dialog.component';
import { ModificaDialogComponent } from '../sharepage/modifica-dialog/modifica-dialog.component';
import { Comune } from '../util/comune';
import { Province } from '../util/province';
import { Regione } from '../util/regione';
import { RequestOfferta } from '../util/request-offerta';
import { ResponseData } from '../util/response';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isLoggedIn = false;
  public pageEvent: PageEvent;
  offerte: Offerta[];
  public offerente = true;
  public ruolo: ResponseData;
  offertaForm: FormGroup = this.formBuilder.group({
    postiLetto: new FormControl('',[Validators.required,Validators.pattern("^[0-9][A-Za-z0-9 -]*$")]),
    numeroCivico: new FormControl('',[Validators.required,Validators.pattern("^[0-9][A-Za-z0-9 -]*$")]),
    via: new FormControl('',[Validators.required]),
    regione: new FormControl('',[Validators.required]),
    provincia: new FormControl('',[Validators.required]),
    comune: new FormControl('',[Validators.required]),
    descrizione: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    display: new FormControl('',[Validators.required])
  });
  comune = "";
  provincia = "";
  regione = "";
  regioni: Regione[];
  province: Province[];
  comuni: Comune[];
  giacenze : Giacenza[];
  filteredOptions: Observable<Regione[]>;
  filteredOptionsP: Observable<Province[]>;
  filteredOptionsC: Observable<Comune[]>;

  private requestOfferta: RequestOfferta;
  offerta: Offerta;
  public creata: boolean;
  public error: boolean;
  today:Date;
  message: string = "";
  uploadedImage: File;
  constructor(private imageService:ImageService,private router:Router,private dialog: MatDialog,private ricercaService: RicercaService,private authService: AuthenticationService,private offerteService:OffertaService,private giacenzaService:GiacenzaService,private formBuilder: FormBuilder) {
    this.regioni = this.ricercaService.getRegioni();
    this.province = this.ricercaService.getProvince();
    this.comuni = this.ricercaService.getComuni();
   }

  ngOnInit(): void {
    this.today= new Date();
    this.creata = false;
    this.error = false;
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.getRuolo().subscribe((ruolo) => {this.ruolo = ruolo; this.getResource();});
    this.filteredOptions = this.offertaForm.get('regione')!.valueChanges.pipe(startWith(''),map(value => this._filterR(value || '')));
    this.offertaForm.get('provincia')!.disable();
    this.offertaForm.get('comune')!.disable();
    if(!this.isLoggedIn){
      this.router.navigate(['login']);
    }
    
    
  }
  valido(data:Date):boolean{
    return new Date(data) > this.today;
  }
  terminato(data:Date):boolean{
    if(data!=null){
      return new Date(data) < this.today;
    }
    return false;
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

  getLoggedIn(){
    return this.authService.getLoggedInUserName();
  }
  reloadData(event:PageEvent): void{
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }
  getResource(){
    //console.log(this.pageSize);
    if(this.ruolo){
      if(this.ruolo.authority=="Profugo"){
        this.giacenzaService.getGiacenzaByUser().subscribe((giacenze) => {this.giacenze=giacenze;});
      }
      if(this.ruolo.authority=="Offerente"){
        this.offerteService.getOffertebyUser().subscribe(offerte => this.offerte = offerte);
      }
    }
  
    //console.log(this.authService.getRuolo());
    
    //console.log(this.ruolo.authority);
  }
 selectOption(optionChangedEvent: MatOptionSelectionChange) {
    console.log(optionChangedEvent);
    if(optionChangedEvent.isUserInput){
      this.filteredOptionsP = this.offertaForm.get('provincia')!.valueChanges.pipe(startWith(''),map(value2 => this._filterP(value2 || '')));
      this.regione = optionChangedEvent.source.value;

      this.provincia = "";
      this.comune = "";

      this.offertaForm.get('provincia')?.reset();
      this.offertaForm.get('comune')?.reset();

      this.province = this.ricercaService.getProvince();

      const r = this.regioni.filter(regione => regione.nome.includes(optionChangedEvent.source.value));
      this.province = this.province.filter(provincia => provincia.id_regione === r[0].id);
      console.log(this.regioni);
      this.offertaForm.get('provincia')?.enable();
    }
  }
  selectOptionP(optionChangedEvent: MatOptionSelectionChange){
    if(optionChangedEvent.isUserInput){
      this.filteredOptionsC = this.offertaForm.get('comune')!.valueChanges.pipe(startWith(''),map(value => this._filterC(value || '')));
      this.provincia=optionChangedEvent.source.value
      this.comune="";
      this.offertaForm.get('comune')?.reset();
      this.comuni = this.ricercaService.getComuni();
      const r = this.province.filter(provincia => provincia.nome.includes(optionChangedEvent.source.value));
      this.comuni = this.comuni.filter(comune => comune.id_provincia === r[0].id);
      console.log(this.comuni);
      this.offertaForm.get('comune')?.enable();
    }
  }
  selectOptionC(optionChangedEvent:MatOptionSelectionChange){
    if(optionChangedEvent.isUserInput){
      this.comune=optionChangedEvent.source.value;
    }
  }

  public onImageUpload(event:any) {    
    this.uploadedImage = event.target.files[0];
    this.offertaForm.get("display")?.patchValue(this.uploadedImage.name);
  }
  performCreate(){

    
    this.requestOfferta = new RequestOfferta();
    this.requestOfferta.setpostiLetto(this.offertaForm.get('postiLetto')!.value);
    this.requestOfferta.setnumeroCivico(this.offertaForm.get('numeroCivico')!.value);
    this.requestOfferta.setvia(this.offertaForm.get('via')!.value);
    this.requestOfferta.setoccupata(false);
    this.requestOfferta.setregione(this.regione);
    this.requestOfferta.setprovincia(this.provincia);
    this.requestOfferta.setcomune(this.comune);
    this.requestOfferta.setDescrizione(this.offertaForm.value.descrizione);
    this.requestOfferta.setImageName(this.uploadedImage.name);
    const comuneInfo = this.comuni.filter(comune => comune.nome==this.comune);
    this.requestOfferta.setlat(comuneInfo[0].latitudine as unknown as Uint8Array);
    this.requestOfferta.setlon(comuneInfo[0].longitudine as unknown as Uint8Array);
    console.log(this.requestOfferta);
    this.offerteService.createOfferta(this.requestOfferta).subscribe((offerta) => {
      this.offerta = offerta;
      if(this.offerta){
        this.creata=true;
        const imageFormData = new FormData();
        imageFormData.append('image',this.uploadedImage,this.uploadedImage.name);
         this.imageService.uploadImage(imageFormData).subscribe((response) => {
        if (response.status === 200){
          console.log(response);
        }
    })
      }
      else{
        this.error=true;
      }
    });
    this.getResource();
  }

  handleClick(giacenza:Giacenza){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Sei sicuro di voler cancellare la tua giacenza?',
        buttonText:{
          ok:'Elimina',
          cancel:'No'
        }
      }
    })
    
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.giacenzaService.deleteGiacenza(giacenza).subscribe((data) => {this.message="Giacenza cancellata con successo";this.getResource()});
      }
    });
  }
   

  terminaGiacenza(giacenza:Giacenza){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Sei sicuro di voler terminare la tua giacenza?',
        buttonText:{
          ok:'Termina',
          cancel:'No'
        }
      }
    })
    
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.giacenzaService.terminaGiacenza(giacenza).subscribe((data) => {this.message="Giacenza terminata con successo";this.getResource()});
      }
    });
  }

  modificaGiacenza(giacenza:Giacenza){
    const dialogRef = this.dialog.open(ModificaDialogComponent,{
      data:{
        giacenza:giacenza
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      let pipe = new DatePipe('en-US');
      console.log();
      if(result.inizio!=""){
        console.log(result.inizio.toString().split('T')[0].split("-").join("/"));
        giacenza.inizio = pipe.transform(result.inizio,'yyyy/MM/dd') || result.inizio.toString().split('T')[0].split("-").join("/");
      }
      if(result.fine!=""){
        giacenza.fine=result.fine.toISOString().split('T')[0].split("-").join("/");
      }
      console.log(giacenza);
      this.giacenzaService.modificaGiacenza(giacenza).subscribe((giaceza) => {console.log(giaceza);this.message="Giacenza modificata con successo";this.getResource()});
    })
  }

  modificaOfferta(offerta:Offerta){

  }
  cancellaOfferta(offerta:Offerta){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Sei sicuro di voler cancellare la tua offerta?',
        buttonText:{
          ok:'Termina',
          cancel:'No'
        }
      }
    })
    
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.offerteService.deleteOfferta(offerta).subscribe((data) => {this.message="Offerta eliminata con successo";this.getResource()});
      }
    });
  }
}
