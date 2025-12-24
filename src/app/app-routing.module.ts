import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { PredmetStatistikaComponent } from './predmet-statistika/predmet-statistika.component';
import { RezervacijaLaboratorijaComponent } from './rezervacija-laboratorija/rezervacija-laboratorija.component';
import { PregledRezervacijaLabComponent } from './pregled-rezervacija-lab/pregled-rezervacija-lab.component';
import { PregledLaboratorijaComponent } from './pregled-laboratorija/pregled-laboratorija.component';
import { DemonstratoriFormaComponent } from './demonstratori-forma/demonstratori-forma.component';
import { PrijavaDemenostratoriComponent } from './prijava-demenostratori/prijava-demenostratori.component';
import { DemonstratoriPrijavljeniComponent } from './demonstratori-prijavljeni/demonstratori-prijavljeni.component';
import { NastavnikPromenaLozinkeComponent } from './nastavnik-promena-lozinke/nastavnik-promena-lozinke.component';
import { roleGuard } from './guardovi/role.guard';
import { NeautorizovanComponent } from './neautorizovan/neautorizovan.component';
import { OdjavaComponent } from './odjava/odjava.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  { path: "", component: PocetnaComponent},
  { path: "login", component: LoginComponent },
  { path: "registracija", component: RegistracijaComponent },
  { path: "predaja", component: PredajaComponent, canActivate: [roleGuard], data: { roles: ['student'] }},
  { path: "prijava", component: PrijavaComponent},
  { path: "pregledPrijava", component: PregledPrijavaComponent},
  { path: "podesavanja", component: PodesavanjaComponent, canActivate: [roleGuard], data: { roles: ['student'] }},
  { path: "admin", component: AdminComponent, children: [
      { path: 'predmeti', component: PredmetiComponent },
      { path: 'nastavnici', component: AdminNastavniciComponent },
      { path: 'upravljanje', component: AdminUpravljanjeComponent },
      { path: 'login', component: AdminLoginComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]},
  { path: "nastavnik", component: NastavnikComponent, children: [
      { path: 'otvaranjeForme', component: NastavnikOtvaranjeFormeComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] }},
      { path: 'aktivneForme', component: NastavnikAktivneFormeComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] } },
      { path: 'istekleForme', component: NastavnikIstekleFormeComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] } },
      { path: 'statistika', component: NastavniciStatistikaComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] } },
      { path: 'statistika/:idPredmet', component: PredmetStatistikaComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] } },
      { path: 'rezervacija', component: RezervacijaLaboratorijaComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] } },
      { path: "demonstratoriForme", component: DemonstratoriFormaComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] }},
      { path: "demonstratoriPrijave", component: DemonstratoriPrijavljeniComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] }},
      { path: "login", component: NastavnikLoginComponent},
      { path: 'obaveze/:idObaveze', component: NastavnikObavezeComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] } },
      { path: "pregledLaboratorija", component: PregledLaboratorijaComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] }},
      { path: "promenaLozinke", component: NastavnikPromenaLozinkeComponent, canActivate: [roleGuard], data: { roles: ['nastavnik'] }},
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]},
  
  { path: 'predmetObaveze/:idPredmet', component: PredmetObavezeComponent },
  { path: 'obavezeStudent/:idObaveze', component: StudentObavezaComponent },
  { path: "prijavljeniLabovi", component: PrijavljeniLaboviComponent, canActivate: [roleGuard], data: { roles: ['student'] }},
  { path: "prijavljeniIspiti", component: PrijavljeniIspitiComponent, canActivate: [roleGuard], data: { roles: ['student'] }},
  { path: "prijavaZaDemonstratore", component: PrijavaDemenostratoriComponent},
  { path: "neautorizovan", component: NeautorizovanComponent},
  { path: "odjava", component: OdjavaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
