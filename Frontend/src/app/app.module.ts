import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OffertaDetailsComponent } from './offerta-details/offerta-details.component';
import { OffertaListComponent } from './offerta-list/offerta-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './httpinterceptor.service';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './sharepage/confirmation-dialog/confirmation-dialog.component';
import { ModificaDialogComponent } from './sharepage/modifica-dialog/modifica-dialog.component'; 
import {MatTabsModule} from '@angular/material/tabs';
import { MapComponent } from './sharepage/map/map.component'; 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    OffertaDetailsComponent,
    OffertaListComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    DashboardComponent,
    ConfirmationDialogComponent,
    ModificaDialogComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:HttpInterceptorService,
      multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
