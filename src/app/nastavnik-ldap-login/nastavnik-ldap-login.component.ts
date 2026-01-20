import { Component } from '@angular/core';
import { NastavniciService } from '../servisi/nastavnici.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nastavnik-ldap-login',
  templateUrl: './nastavnik-ldap-login.component.html',
  styleUrls: ['./nastavnik-ldap-login.component.css']
})
export class NastavnikLdapLoginComponent {
  constructor(private nastvniciS: NastavniciService, private router: Router) { }

  korIme: string = "";
  lozinka: string = "";
  greska: string = "";

  login() {
    this.greska = "";
    if (this.korIme == "") {
      this.greska = "Nije uneto korisničko ime!";
    }
    else if (this.lozinka == "") {
      this.greska = "Nije uneta lozinka!";
    }
    else {
      this.nastvniciS.prijavaLdap(this.korIme, this.lozinka).subscribe(
        data => {
          if (data == null) {
            this.greska = "Neuspešna prijava!";
          }
          else {
            localStorage.setItem('ulogovan', JSON.stringify(data));
            this.router.navigate(['nastavnik/otvaranjeForme']);
          }
        }
      )
    }
  }
}
