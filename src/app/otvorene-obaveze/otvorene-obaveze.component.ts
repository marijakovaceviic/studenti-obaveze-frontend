import { Component } from '@angular/core';
import { PredmetiService } from '../servisi/predmeti.service';
import { ObavezeService } from '../servisi/obaveze.service';
import { Predmet } from '../modeli/predmet';
import { Nastavnik } from '../modeli/nastavnik';
import { Obaveza } from '../modeli/obaveza';

@Component({
  selector: 'app-otvorene-obaveze',
  templateUrl: './otvorene-obaveze.component.html',
  styleUrls: ['./otvorene-obaveze.component.css']
})
export class OtvoreneObavezeComponent {
  constructor(private predmetiS: PredmetiService, private obavezeS: ObavezeService) { }

  predmeti: Predmet[] = [];
  ulogovan: Nastavnik = new Nastavnik();
  obavezeMapa: { [predmetId: number]: Obaveza[] } = {};
  brojObavezaMapa: { [predmetId: number]: number } = {};

  ngOnInit(): void {
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);

      this.predmetiS.dohvatanjePredmetaZaNastavnika(this.ulogovan.id).subscribe(
        predmeti => {
          this.predmeti = predmeti;

          predmeti.forEach(p => {
            this.obavezeS.brojNovihNeaktivnihObavezaNaPredmetu(p.id).subscribe(
              broj => {
                this.brojObavezaMapa[p.id] = broj;
              }
            );
          });
        }
      )

    }
  }

  ucitajObaveze(predmetId: number) {
    if (this.obavezeMapa[predmetId]) {
      return;
    }

    this.obavezeS.dohvatanjeNovootvorenihObavezaZaPredmet(predmetId).subscribe(
      data => {
        this.obavezeMapa[predmetId] = data;
      }
    );
  }
}
