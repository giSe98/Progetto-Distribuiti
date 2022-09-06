import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Offerente } from '../offerente';
import { Profugo } from '../profugo';
import { SignupService } from '../signup.service';
import { RequestRegistration } from '../util/request-registration';
import { ResponseData } from '../util/response';
import { MyErrorStateMatcher } from './error';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  //validator consolato oppure codice fiscale
  atLeastOne = (validator: ValidatorFn, controls:string[] = []) => (
    group: FormGroup,
  ): ValidationErrors | null => {
    if(!controls){
      controls = Object.keys(group.controls)
    }
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    let hasAtLeastOne = group && group.controls && controls
      .some(k => !validator(group.controls[k]));
    if(this.selected=="profugo"){
      hasAtLeastOne = group.get("consolato")!.value != ""
    }
    else{
      hasAtLeastOne = group.get('codiceF')!.value != ""
    }
    return hasAtLeastOne && pass===confirmPass ? null : {
      atLeastOne: true,
    };
  };

  //validator conferma password
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  lessThanToday(control: FormControl): { [key: string]: any } | null  {
    let today : Date = new Date();

   if (new Date(control.value) > today)
       return { "LessThanToday": true };

   return null;
}

  //ruolo selezionato
  selected:string;

  signin: FormGroup = this.formBuilder.group({
    nome: new FormControl('',[Validators.required]),
    cognome: new FormControl('',[Validators.required]),
    data: new FormControl(new Date,[Validators.required,this.lessThanToday]),
    telefono: new FormControl('',[Validators.required,Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]),
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ]),
    confirmPassword: new FormControl('', [Validators.required, Validators.min(3) ]),
    ruolo: new FormControl('',[]),
    consolato: new FormControl('',[]),
    codiceF: new FormControl('',[Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$')])
  }, { validator: this.atLeastOne(Validators.required, ['consolato','codiceF'])  });

  hide = true;
  hide2 = true;
  errore = false;
  riuscita = false;
  get emailInput() { return this.signin.get('email'); }

  get passwordInput() { return this.signin.get('password'); }

  private requestRegistration: RequestRegistration;
  profugo: Profugo;
  offerente: Offerente;

  performRegistration(){
    this.errore = false;
    if(this.selected=='profugo'){
        console.log("profugo");
        this.requestRegistration = new RequestRegistration();
        this.requestRegistration.setNome(this.signin.get('nome')!.value);
        this.requestRegistration.setCognome(this.signin.get('cognome')!.value);
        this.requestRegistration.setDataDiNascita(this.signin.get('data')!.value);
        this.requestRegistration.setTelefono(this.signin.get('telefono')!.value);
        this.requestRegistration.setEmail(this.signin.get('email')!.value);
        this.requestRegistration.setPassword(this.signin.get('password')!.value);
        this.requestRegistration.setConsolato(this.signin.get('consolato')!.value);
        this.requestRegistration.setRuolo("profugo");
        this.signupService.register(this.requestRegistration).subscribe((profugo) => {this.profugo = profugo;
          if(!this.profugo){
            this.errore = true;
          }
        });
    }
    else{

        this.requestRegistration = new RequestRegistration();
        this.requestRegistration.setNome(this.signin.get('nome')!.value);
        this.requestRegistration.setCognome(this.signin.get('cognome')!.value);
        this.requestRegistration.setDataDiNascita(this.signin.get('data')!.value);
        this.requestRegistration.setTelefono(this.signin.get('telefono')!.value);
        this.requestRegistration.setEmail(this.signin.get('email')!.value);
        this.requestRegistration.setPassword(this.signin.get('password')!.value);
        this.requestRegistration.setCodiceF(this.signin.get('codiceF')!.value);
        this.requestRegistration.setRuolo("offerente");

        this.signupService.register(this.requestRegistration).subscribe((offerente) => {this.offerente = offerente;
          if(!this.offerente){
            this.errore=true;
          }
        });
    }
  }
  
  

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) { }

  ngOnInit(): void {
    this.errore = false;
    this.riuscita = false;
  }


}
