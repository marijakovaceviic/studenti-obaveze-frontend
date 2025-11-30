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
import { PodesavanjaComponent } from './podesavanja/podesavanja.component';
import { PredmetiComponent } from './predmeti/predmeti.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNastavniciComponent } from './admin-nastavnici/admin-nastavnici.component';
import { AdminUpravljanjeComponent } from './admin-upravljanje/admin-upravljanje.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { NastavnikOtvaranjeFormeComponent } from './nastavnik-otvaranje-forme/nastavnik-otvaranje-forme.component';
import { NastavnikLoginComponent } from './nastavnik-login/nastavnik-login.component';
import { NastavnikAktivneFormeComponent } from './nastavnik-aktivne-forme/nastavnik-aktivne-forme.component';
import { NastavnikObavezeComponent } from './nastavnik-obaveze/nastavnik-obaveze.component';
import { PredmetObavezeComponent } from './predmet-obaveze/predmet-obaveze.component';
import { StudentObavezaComponent } from './student-obaveza/student-obaveza.component';
import { PregledPrijavaComponent } from './pregled-prijava/pregled-prijava.component';
import { PrijavljeniLaboviComponent } from './prijavljeni-labovi/prijavljeni-labovi.component';
import { PrijavljeniIspitiComponent } from './prijavljeni-ispiti/prijavljeni-ispiti.component';
import { NastavnikIstekleFormeComponent } from './nastavnik-istekle-forme/nastavnik-istekle-forme.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    PredajaComponent,
    PrijavaComponent,
    PocetnaComponent,
    PodesavanjaComponent,
    PredmetiComponent,
    AdminComponent,
    AdminNastavniciComponent,
    AdminUpravljanjeComponent,
    NastavnikComponent,
    NastavnikOtvaranjeFormeComponent,
    NastavnikLoginComponent,
    NastavnikAktivneFormeComponent,
    NastavnikObavezeComponent,
    PredmetObavezeComponent,
    StudentObavezaComponent,
    PregledPrijavaComponent,
    PrijavljeniLaboviComponent,
    PrijavljeniIspitiComponent,
    NastavnikIstekleFormeComponent
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
