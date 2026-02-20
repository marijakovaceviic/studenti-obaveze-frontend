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
import { NastavniciStatistikaComponent } from './nastavnici-statistika/nastavnici-statistika.component';
import { NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PredmetStatistikaComponent } from './predmet-statistika/predmet-statistika.component';
import { RezervacijaLaboratorijaComponent } from './rezervacija-laboratorija/rezervacija-laboratorija.component';
import { PregledRezervacijaLabComponent } from './pregled-rezervacija-lab/pregled-rezervacija-lab.component';
import { PregledLaboratorijaComponent } from './pregled-laboratorija/pregled-laboratorija.component';
import { PrijavaDemenostratoriComponent } from './prijava-demenostratori/prijava-demenostratori.component';
import { DemonstratoriFormaComponent } from './demonstratori-forma/demonstratori-forma.component';
import { DemonstratoriPrijavljeniComponent } from './demonstratori-prijavljeni/demonstratori-prijavljeni.component';
import { NastavnikPromenaLozinkeComponent } from './nastavnik-promena-lozinke/nastavnik-promena-lozinke.component';
import { NeautorizovanComponent } from './neautorizovan/neautorizovan.component';
import { OdjavaComponent } from './odjava/odjava.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminStatistikaGodineComponent } from './admin-statistika-godine/admin-statistika-godine.component';
import { StudentLdapLoginComponent } from './student-ldap-login/student-ldap-login.component';
import { NastavnikLdapLoginComponent } from './nastavnik-ldap-login/nastavnik-ldap-login.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { OtvoreneObavezeComponent } from './otvorene-obaveze/otvorene-obaveze.component';
import { AzuriranjeObavezeComponent } from './azuriranje-obaveze/azuriranje-obaveze.component';

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
    NastavnikIstekleFormeComponent,
    NastavniciStatistikaComponent,
    PredmetStatistikaComponent,
    RezervacijaLaboratorijaComponent,
    PregledRezervacijaLabComponent,
    PregledLaboratorijaComponent,
    PrijavaDemenostratoriComponent,
    DemonstratoriFormaComponent,
    DemonstratoriPrijavljeniComponent,
    NastavnikPromenaLozinkeComponent,
    NeautorizovanComponent,
    OdjavaComponent,
    AdminLoginComponent,
    AdminStatistikaGodineComponent,
    StudentLdapLoginComponent,
    NastavnikLdapLoginComponent,
    ZaboravljenaLozinkaComponent,
    OtvoreneObavezeComponent,
    AzuriranjeObavezeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgChartsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
