import { PortalInjector } from '@angular/cdk/portal';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Giacenza } from '../../giacenza';

@Component({
  selector: 'app-modifica-dialog',
  templateUrl: './modifica-dialog.component.html',
  styleUrls: ['./modifica-dialog.component.css']
})
export class ModificaDialogComponent implements OnInit {
  inizio:Date;
  fine:Date;
  modificaForm: FormGroup = this.formBuilder.group({
    inizio: new FormControl('',[]),
    fine: new FormControl('',[])
  },{validator: this.dateLessThan('inizio','fine')})
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Giacenza,
    private dialogRef: MatDialogRef<ModificaDialogComponent>
  ) {
      this.inizio = data.inizio;
      this.fine = data.fine;
   }

   inizioPassato(data:Date):boolean{
    return new Date() > data;
   }
   dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[from];
     let t = group.controls[to];
     if(f.value == "" && t.value==""){
      return {
        dates: "Date from should be less than Date to"
      };
     }
     if(f.value < new Date()){
        return {
          dates: "Date from should be less than Date to"
        };
     }
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
  ngOnInit(): void {
  }

  performModifiche(){
    this.dialogRef.close(this.modificaForm.value);
  }
}
