import { Component } from '@angular/core';
import { Predmet } from '../modeli/predmet';
import { PredmetiService } from '../servisi/predmeti.service';
import { Nastavnik } from '../modeli/nastavnik';
import { Obaveza } from '../modeli/obaveza';
import { ObavezeService } from '../servisi/obaveze.service';

@Component({
  selector: 'app-nastavnik-aktivne-forme',
  templateUrl: './nastavnik-aktivne-forme.component.html',
  styleUrls: ['./nastavnik-aktivne-forme.component.css']
})
export class NastavnikAktivneFormeComponent {
  
  constructor(private predmetiS: PredmetiService, private obavezeS: ObavezeService){}

  predmeti: Predmet[] = [];
  ulogovan: Nastavnik = new Nastavnik();
  obavezeMapa: { [predmetId: number]: Obaveza[] } = {};
  brojObavezaMapa: { [predmetId: number]: number } = {};

  ngOnInit():void{
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);

      this.predmetiS.dohvatanjePredmetaZaNastavnika(this.ulogovan.id).subscribe(
        predmeti=>{
          this.predmeti = predmeti;

          predmeti.forEach(p => {
            this.obavezeS.brojAktivnihObavezaZaPredmet(p.id).subscribe(
              broj => {
                this.brojObavezaMapa[p.id] = broj;
              }
            );
          });
        }
      )

    }
  }

  ucitajObaveze(predmetId: number){
    if (this.obavezeMapa[predmetId]) {
      return; 
    }

    this.obavezeS.dohvatanjeObavezaZaPredmet(predmetId).subscribe(
      data => {
        this.obavezeMapa[predmetId] = data;
      }
    );
  }

}
