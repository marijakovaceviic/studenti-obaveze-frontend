import { Component } from '@angular/core';
import { StudentService } from '../servisi/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-ldap-login',
  templateUrl: './student-ldap-login.component.html',
  styleUrls: ['./student-ldap-login.component.css']
})
export class StudentLdapLoginComponent {
  constructor(private studentS:StudentService, private router:Router) {}
  
  korIme: string = "";
  lozinka: string = "";
  greska: string = "";

  login(){
    this.greska = "";

    if (this.korIme == ""){
      this.greska = "Nije unet email!";
    }
    else if (this.lozinka == ""){
      this.greska = "Nije uneta lozinka!";
    }
    else {
      this.studentS.prijavaLdap(this.korIme, this.lozinka).subscribe(
      data =>{
        if (data == null){
            this.greska = "Neuspešna prijava!";
          }
          else{
            localStorage.setItem('ulogovan', JSON.stringify(data));
            this.router.navigate(['']);
          }
      }
    )
    }
  }

}
