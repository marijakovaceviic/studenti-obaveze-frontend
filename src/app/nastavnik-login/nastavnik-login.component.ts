import { Component } from '@angular/core';

@Component({
  selector: 'app-nastavnik-login',
  templateUrl: './nastavnik-login.component.html',
  styleUrls: ['./nastavnik-login.component.css']
})
export class NastavnikLoginComponent {
    email: string = "";
    lozinka: string = "";
    greska: string = "";
  
    login(){
  
      if (this.email == ""){
        this.greska = "Nije unet email";
      }
      else if (this.lozinka == ""){
        this.greska = "Nije uneta lozinka";
      }
      else {
        //const kriptovanaLozinka = CryptoJS.SHA256(this.lozinka).toString();
  
        /*this.studentS.prijava(email, kriptovanaLozinka).subscribe(
          data => {
            if (data == null){
              this.greska = "Pogrešan email ili lozinka!";
            }
            else{
              localStorage.setItem('ulogovan', JSON.stringify(data));
            }
          }
        ) */
      }
  }
}
