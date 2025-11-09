import { Component } from '@angular/core';
import { KorisnikService } from '../servisi/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private korisnikS:KorisnikService, private router:Router) {}

  korisnickoIme: string = "";
  lozinka: string = "";
  greska: string = "";

  login(){
    if (this.korisnickoIme == ""){
      this.greska = "Nije uneto korisničko ime";
    }
    else if (this.lozinka == ""){
      this.greska = "Nije uneta lozinka";
    }
    else {
      this.korisnikS.prijava(this.korisnickoIme, this.lozinka).subscribe(
        data => {
          if (data == null){
            this.greska = "Pogresno korisničko ime ili šifra!";
          }
        }
      )
    }
  }

  registracija(){
    this.router.navigate(['/registracija']);
  }
}
