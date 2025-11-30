import { Component } from '@angular/core';
import { PredmetiService } from '../servisi/predmeti.service';
import { ObavezeService } from '../servisi/obaveze.service';
import { Predmet } from '../modeli/predmet';
import { Nastavnik } from '../modeli/nastavnik';
import { Obaveza } from '../modeli/obaveza';

@Component({
  selector: 'app-nastavnik-istekle-forme',
  templateUrl: './nastavnik-istekle-forme.component.html',
  styleUrls: ['./nastavnik-istekle-forme.component.css']
})
export class NastavnikIstekleFormeComponent {
  
  constructor(private predmetiS: PredmetiService, private obavezeS: ObavezeService){}
  
  predmeti: Predmet[] = [];
  ulogovan: Nastavnik = new Nastavnik();
  obavezeMapa: { [predmetId: number]: Obaveza[] } = {};
  
  ngOnInit():void{
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
  
  ucitajObaveze(predmetId: number){
    if (this.obavezeMapa[predmetId]) {
      return; 
    }

    this.obavezeS.dohvatanjeIsteklihObavezaZaPredmet(predmetId).subscribe(
      data => {
        this.obavezeMapa[predmetId] = data;
      }
    );
  }
  
}
