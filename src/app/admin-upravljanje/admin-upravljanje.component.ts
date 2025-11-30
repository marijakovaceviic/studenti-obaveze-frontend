import { Component } from '@angular/core';
import { PredmetiService } from '../servisi/predmeti.service';
import { Predmet } from '../modeli/predmet';
import { Nastavnik } from '../modeli/nastavnik';
import { NastavniciService } from '../servisi/nastavnici.service';

@Component({
  selector: 'app-admin-upravljanje',
  templateUrl: './admin-upravljanje.component.html',
  styleUrls: ['./admin-upravljanje.component.css']
})
export class AdminUpravljanjeComponent {

  constructor(private predmetiS: PredmetiService, private nastavniciS: NastavniciService){}

  sviPredmeti: Predmet[] = [];
  izabraniPredmet: number = 0;

  sviNastavnici: Nastavnik[] = [];
  nastavniciNaPredmetu: any[] = [];
  ostaliNastavnici: any[] = [];

  ngOnInit(): void {
    this.predmetiS.dohvatanjeSvihPredmeta().subscribe(
      data =>{
        this.sviPredmeti = data;
      }
    )

    this.nastavniciS.dohvatanjeSvihNastavnika().subscribe(
      data =>{
        this.sviNastavnici = data;
      }
    )    
  }

  ucitajNastavnikeZaPredmet() {
    this.nastavniciS.dohvatanjeNastavnikaNaPredmetu(this.izabraniPredmet).subscribe(
      data =>{
        this.nastavniciNaPredmetu = data;

        this.ostaliNastavnici = this.sviNastavnici.filter(n =>
          !this.nastavniciNaPredmetu.some(na => na.id === n.id)
        );
      }
    )

  }

  dodajNaPredmet(idNastavnik: number) {
    this.nastavniciS.dodavanjeNastavnikaNaPredemt(idNastavnik, this.izabraniPredmet).subscribe(
      data =>{
        
      }
    )
  }

  obrisiSaPredmeta(idNastavnik: number) {
    this.nastavniciS.brisanjeNastavnikaSaPredemta(idNastavnik, this.izabraniPredmet).subscribe(
      data =>{

      }
    )
  }

}
