import { Component } from '@angular/core';
import { Predmet } from '../modeli/predmet';
import { PredmetiService } from '../servisi/predmeti.service';
import { Nastavnik } from '../modeli/nastavnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nastavnici-statistika',
  templateUrl: './nastavnici-statistika.component.html',
  styleUrls: ['./nastavnici-statistika.component.css']
})
export class NastavniciStatistikaComponent {
  
  constructor(private predmetiS: PredmetiService, private router: Router){}

  predmeti: Predmet[] = [];
  ulogovan: Nastavnik = new Nastavnik();

  ngOnInit(): void{
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);

      this.predmetiS.dohvatanjePredmetaZaNastavnika(this.ulogovan.id).subscribe(
        predmeti=>{
          this.predmeti = predmeti;
        }
      )
    } 
  }


  prikaziStatistiku(id: number){
    this.router.navigate(['/nastavnik/statistika', id]);
  }
}
