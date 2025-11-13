import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PredajaComponent } from './predaja/predaja.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfesorPredajaComponent } from './profesor-predaja/profesor-predaja.component';
import { PodesavanjaComponent } from './podesavanja/podesavanja.component';
import { PredmetiComponent } from './predmeti/predmeti.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    PredajaComponent,
    PrijavaComponent,
    PocetnaComponent,
    ProfesorPredajaComponent,
    PodesavanjaComponent,
    PredmetiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
