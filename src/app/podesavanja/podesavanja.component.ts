import { Component } from '@angular/core';
import { Student } from '../modeli/student';
import { StudentService } from '../servisi/student.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-podesavanja',
  templateUrl: './podesavanja.component.html',
  styleUrls: ['./podesavanja.component.css']
})
export class PodesavanjaComponent {

  constructor(private studentS:StudentService){}

  aktivanTab: string = 'profil';
  ulogovan: Student = new Student();

  staraLozinka:string = "";
  novaLozinka:string = "";
  potvrdaLozinke:string = "";
  greska:string = "";

  ngOnInit(): void {
    let student = localStorage.getItem("ulogovan");
    if (student != null) {
      this.ulogovan = JSON.parse(student);
    }
  }

  promenaLozinke(){
    let regexLozinka = /^(?=[a-zA-Z])(?=.*\d)(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{6,10}$/;

    if (this.staraLozinka == "") {
      this.greska = "Nije uneta stara lozinka!";
    }
    else if(this.novaLozinka == ""){
      this.greska = "Nije uneta nova lozinka!";
    }
    else if(this.potvrdaLozinke == ""){
      this.greska = "Nije uneta potvrda nove lozinke!";
    }
    else if (!regexLozinka.test(this.novaLozinka)){
      this.greska = "Nova lozinka nije u dobrom formatu!";
    }
    else if (this.novaLozinka != this.potvrdaLozinke){
      this.greska = "Potvrda lozinke se razlikuje od unete nove lozinke";
    }
    else{
      const kriptovanaLozinka = CryptoJS.SHA256(this.staraLozinka).toString();
      const kriptovanaNova = CryptoJS.SHA256(this.novaLozinka).toString();
      if (kriptovanaLozinka != kriptovanaNova){
        this.greska = "Netačna stara lozinka!";
      }
      else{
        this.studentS.promenaLozinke(this.ulogovan.email, kriptovanaNova).subscribe(
          data =>{
            if (data != 0){
              this.greska = "Uspešno promenjena lozinka!";
              //resetovati formu
            }
          }
        )
      }
    }
  }

}
