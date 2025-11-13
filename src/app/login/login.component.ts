import { Component } from '@angular/core';
import { StudentService } from '../servisi/student.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private studentS:StudentService, private router:Router) {}

  korIme: string = "";
  lozinka: string = "";
  greska: string = "";

  login(){
    let email = this.korIme + "@student.etf.bg.ac.rs";

    if (this.korIme == ""){
      this.greska = "Nije unet email";
    }
    else if (this.lozinka == ""){
      this.greska = "Nije uneta lozinka";
    }
    else {
      const kriptovanaLozinka = CryptoJS.SHA256(this.lozinka).toString();

      this.studentS.prijava(email, kriptovanaLozinka).subscribe(
        data => {
          if (data == null){
            this.greska = "Pogrešan email ili lozinka!";
          }
          else{
            localStorage.setItem('ulogovan', JSON.stringify(data));
          }
        }
      )
    }
  }

  registracija(){
    this.router.navigate(['/registracija']);
  }
}
