import { Component } from '@angular/core';
import { NastavniciService } from '../servisi/nastavnici.service';

@Component({
  selector: 'app-nastavnik-login',
  templateUrl: './nastavnik-login.component.html',
  styleUrls: ['./nastavnik-login.component.css']
})
export class NastavnikLoginComponent {

  constructor(private nastvniciS: NastavniciService) { }

  email: string = "";
  lozinka: string = "";
  greska: string = "";
  uspeh: string = "";

  login() {
    this.greska = "";
    this.uspeh = "";
    if (this.email == "") {
      this.greska = "Nije unet email!";
    }
    else if (this.lozinka == "") {
      this.greska = "Nije uneta lozinka!";
    }
    else {
      this.nastvniciS.prijava(this.email, this.lozinka).subscribe(           
        data => {
          if (data == null) {
            this.greska = "Pogrešan email ili lozinka!";
          }
          else {
            localStorage.setItem('ulogovan', JSON.stringify(data));
            this.uspeh = "Uspešno ste se prijavili!";
          }
        }
      ) 
    }
  }
}
