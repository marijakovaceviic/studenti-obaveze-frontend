import { Component } from '@angular/core';
import {StudentService } from '../servisi/student.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {

  constructor(private studentS:StudentService) {}

  lozinka: string = "";
  korIme:string = "";
  greska: string = "";

  registracija(){
    let regexLozinka = /^(?=[a-zA-Z])(?=.*\d)(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{6,10}$/;
    let regexKorIme = /^[a-z]{2}\d{6}[a-z]$/;

    let email = this.korIme + "@student.etf.bg.ac.rs";

    if(!regexLozinka.test(this.lozinka)){
      this.greska = "Lozinka mora počinjati slovom i mora imati od 6 do 10 karaktera, od toga bar jedno veliko slovo, tri mala, jedan broj i jedan specijalni karakter";
    }
    else if (!regexKorIme.test(this.korIme)){
      this.greska = "Email adresa nije u dobrom formatu!";
    }
    else{
      this.studentS.proveraStudenta(email).subscribe(
         id => {
          if (id == 0){
            this.greska = "Ne postoji student sa tim email-om!";
          }
          else{
            const kriptovanaLozinka = CryptoJS.SHA256(this.lozinka).toString();
            this.studentS.registracija(id, email, kriptovanaLozinka).subscribe(
              rez => {
                if (rez == 0){
                  this.greska = "Student je već registrovan!";
                }
                else{
                  //osveziti formu
                  //i poruka uspesna registracija
                }
              }
            )
          }
        }
      )
    }
  }
}
