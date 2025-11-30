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

const routes: Routes = [
  { path: "", component: PocetnaComponent},
  { path: "login", component: LoginComponent },
  { path: "registracija", component: RegistracijaComponent },
  { path: "predaja", component: PredajaComponent},
  { path: "prijava", component: PrijavaComponent},
  { path: "pregledPrijava", component: PregledPrijavaComponent},
  { path: "podesavanja", component: PodesavanjaComponent},
  { path: "predmeti", component: PredmetiComponent},
  { path: "admin", component: AdminComponent, children: [
      { path: 'predmeti', component: PredmetiComponent },
      { path: 'nastavnici', component: AdminNastavniciComponent },
      { path: 'upravljanje', component: AdminUpravljanjeComponent },
      { path: '', redirectTo: 'predmeti', pathMatch: 'full' }
    ]},
  { path: "nastavnik", component: NastavnikComponent, children: [
      { path: 'otvaranjeForme', component: NastavnikOtvaranjeFormeComponent },
      { path: 'aktivneForme', component: NastavnikAktivneFormeComponent },
      { path: 'istekleForme', component: NastavnikIstekleFormeComponent },
      { path: '', redirectTo: 'otvaranjeForme', pathMatch: 'full' }
    ]},
  { path: "nastavnikLogin", component: NastavnikLoginComponent},
  { path: 'obaveze/:idObaveze', component: NastavnikObavezeComponent },
  { path: 'predmetObaveze/:idPredmet', component: PredmetObavezeComponent },
  { path: 'obavezeStudent/:idObaveze', component: StudentObavezaComponent },
  { path: "prijavljeniLabovi", component: PrijavljeniLaboviComponent},
  { path: "prijavljeniIspiti", component: PrijavljeniIspitiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
