import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../auth.service';
import { Giacenza } from '../giacenza';
import { GiacenzaService } from '../giacenza.service';
import { ImageService } from '../image.service';
import { Offerta } from '../offerta';
import { OffertaListComponent } from '../offerta-list/offerta-list.component';
import { OffertaService } from '../offerta.service';
import { MapComponent } from '../sharepage/map/map.component';
import { RequestGiacenza } from '../util/request-giacenza';
import { ResponseData } from '../util/response';

@Component({
  selector: 'app-offerta-details',
  templateUrl: './offerta-details.component.html',
  styleUrls: ['./offerta-details.component.css'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class OffertaDetailsComponent implements OnInit {
  @Input() offerta:Offerta;
  public ruolo:ResponseData
  isLoggedIn: boolean;
  giacenza: boolean;
  giacenzaOBJ: Giacenza;
  private giacenzaRequest:RequestGiacenza;
  message: string;
  dbImage: any;
  constructor(private imageService:ImageService,private dialog: MatDialog,private formBuilder: FormBuilder,private giacenzaService:GiacenzaService,private offertaService:OffertaService,private listOfferta:OffertaListComponent,private authService:AuthenticationService) { }

  giacenzaForm: FormGroup = this.formBuilder.group({
    inizio: new FormControl('',[Validators.required]),
    fine: new FormControl('',[])
  },{validator: this.dateLessThan('inizio','fine')})

  ngOnInit(): void {
    this.error="";
    this.message ="";
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.imageService.getImageByName(this.offerta.imageName).subscribe((res) =>{
      this.dbImage = 'data:image/*;base64,'+ res.image;
    });
    if(this.isLoggedIn){
      this.authService.getRuolo().subscribe(ruolo => this.ruolo=ruolo);
    }
  }
  handleClick() { 
    this.giacenza = !this.giacenza;
  } 

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[from];
     let t = group.controls[to];
     if(t.value ==""){
      return {};
     }
     if (f.value > t.value) {
       return {
         dates: "Date from should be less than Date to"
       };
     }
     return {};
    }
  }
  error:string;
  performRegistration(){
      this.error = "";
      this.message ="";
      this.giacenzaRequest = new RequestGiacenza();
      let d:Date = this.giacenzaForm.get('inizio')!.value;
      console.log(d.getDate());
      this.giacenzaRequest.setinizio(this.giacenzaForm.get('inizio')!.value.toISOString().split('T')[0].split("-").join("/"));
      if(this.giacenzaForm.get('fine')?.value!=""){
        this.giacenzaRequest.setfine(this.giacenzaForm.get('fine')!.value.toISOString().split('T')[0].split("-").join("/"));
      }
      
      this.giacenzaRequest.setofferta(this.offerta);

      this.giacenzaService.createGiacenza(this.giacenzaRequest).subscribe(giacenza => {this.giacenzaOBJ=giacenza; 
        if(this.giacenzaOBJ!=null){
          this.message = "Offerta creata correttamente";
        } },error => {this.error=error.error;console.log(this.error);});
      console.log(this.error);
      console.log(this.giacenzaOBJ);
  }

  
openMap(){
  const dialogRef = this.dialog.open(MapComponent,{
    data:{
        lat:this.offerta.lat,
        lon:this.offerta.lon
    }
  });

  
}

}

