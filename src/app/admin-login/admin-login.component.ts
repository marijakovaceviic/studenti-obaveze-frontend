import { Component } from '@angular/core';
import { AdminService } from '../servisi/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private adminS: AdminService, private router: Router) { }
  
  email: string = "";
  lozinka: string = "";
  greska: string = "";
  
  login() {
    this.greska = "";
    if (this.email == "") {
      this.greska = "Nije unet email!";
    }
    else if (this.lozinka == "") {
      this.greska = "Nije uneta lozinka!";
    }
    else {
      this.adminS.prijava(this.email, this.lozinka).subscribe(           
        data => {
          if (data == null) {
            this.greska = "Pogrešan email ili lozinka!";
          }
          else {
            localStorage.setItem('ulogovan', JSON.stringify(data));
            this.router.navigate(['admin/predmeti']);
          }
        }
      ) 
    }
  }

  zaboravljenaLozinka(){
    this.router.navigate(['/admin/zaboravljenaLozinka', 'admin']);
  }
}
