import { Component } from '@angular/core';
import { StudentService } from '../servisi/student.service';
import { Router } from '@angular/router';

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
  uspeh: string = "";

  login(){
    let email = this.korIme + "@student.etf.bg.ac.rs";

    if (this.korIme == ""){
      this.greska = "Nije unet email!";
    }
    else if (this.lozinka == ""){
      this.greska = "Nije uneta lozinka!";
    }
    else {
      this.studentS.prijava(email, this.lozinka).subscribe(
        data => {
          if (data == null){
            this.greska = "Pogrešan email ili lozinka!";
          }
          else{
            localStorage.setItem('ulogovan', JSON.stringify(data));
            this.uspeh = "Uspešno ste se prijavili!";
          }
        }
      )
    }
  }

  registracija(){
    this.router.navigate(['/registracija']);
  }
}
