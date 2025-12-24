import { Component } from '@angular/core';
import { Nastavnik } from '../modeli/nastavnik';
import { DemonstratoriService } from '../servisi/demonstratori.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent {
    
  constructor(private demonstratoriS: DemonstratoriService, private router: Router){}

  ulogovan: Nastavnik = new Nastavnik();
  zaduzen: boolean = false;
    
  ngOnInit(): void{
    this.ucitavanjePodataka();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ucitavanjePodataka();
      }
    });
  }

  ucitavanjePodataka(){
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);

      this.demonstratoriS.zaduzenZaDemonstratore(this.ulogovan.id).subscribe(
        status =>{
          this.zaduzen = status;
        }
      )
    }
  }
}
