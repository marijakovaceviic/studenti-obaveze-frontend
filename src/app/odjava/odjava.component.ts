import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-odjava',
  templateUrl: './odjava.component.html',
  styleUrls: ['./odjava.component.css']
})
export class OdjavaComponent {

  constructor(private router: Router){}
  
  odjava() {
    const ulogovan = localStorage.getItem('ulogovan');
    let tip = '';

    if (ulogovan) {
      tip = JSON.parse(ulogovan).tip; 
    }
    else{
      return;
    }

    localStorage.removeItem('ulogovan');

    if (tip === 'nastavnik') {
      this.router.navigate(['/nastavnik/login']);
    } else if (tip === 'admin') {
      this.router.navigate(['/admin/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  odustani() {
    window.history.back();
  }


}
