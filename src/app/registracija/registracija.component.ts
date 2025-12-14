import { Component } from '@angular/core';
import {StudentService } from '../servisi/student.service';

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
  uspeh: string = "";

  registracija(){
    this.greska = "";
    this.uspeh = "";
    if (this.korIme = ""){
      this.greska = "Nije uneta email adresa!";
      return;
    }

    let regexLozinka = /^(?=[a-zA-Z])(?=.*\d)(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{6,10}$/;
    let regexKorIme = /^[a-z]{2}\d{6}[a-z]$/;

    let email = this.korIme + "@student.etf.bg.ac.rs";

    if(!regexLozinka.test(this.lozinka)){
      this.greska = "Lozinka mora počinjati slovom i mora imati od 6 do 10 karaktera, od toga bar jedno veliko slovo, tri mala, jedan broj i jedan specijalni karakter";
    }
    else if (!regexKorIme.test(this.korIme)){
      this.greska = "Email adresa nije u očekivanom formatu!";
    }
    else{
      this.studentS.proveraStudenta(email).subscribe(
         id => {
          if (id == 0){
            this.greska = "Pogrešna email adresa!";
          }
          else{
            this.studentS.registracija(id, email, this.lozinka).subscribe(
              rez => {
                if (rez == 0){
                  this.greska = "Student je već registrovan!";
                }
                else{
                  this.uspeh = "Uspešno ste se registrovali!";
                  this.korIme = "";
                  this.lozinka = "";
                }
              }
            )
          }
        }
      )
    }
  }
}
