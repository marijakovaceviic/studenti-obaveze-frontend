import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PredajaComponent } from './predaja/predaja.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PodesavanjaComponent } from './podesavanja/podesavanja.component';
import { PredmetiComponent } from './predmeti/predmeti.component';

const routes: Routes = [
  { path: "", component: PocetnaComponent},
  { path: "login", component: LoginComponent },
  { path: "registracija", component: RegistracijaComponent },
  { path: "predaja", component: PredajaComponent},
  { path: "prijava", component: PrijavaComponent},
  { path: "podesavanja", component: PodesavanjaComponent},
  { path: "predmeti", component: PredmetiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
