import { Component } from '@angular/core';
import { Nastavnik } from '../modeli/nastavnik';
import { DemonstratoriService } from '../servisi/demonstratori.service';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent {
    
  constructor(private demonstratoriS: DemonstratoriService){}

  ulogovan: Nastavnik = new Nastavnik();
  zaduzen: boolean = false;
    
  ngOnInit(): void{
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
