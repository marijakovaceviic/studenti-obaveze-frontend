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

  constructor(private predmetiS: PredmetiService, private nastavniciS: NastavniciService) { }

  sviPredmeti: Predmet[] = [];
  izabraniPredmet: number = 0;

  sviNastavnici: Nastavnik[] = [];
  nastavniciNaPredmetu: Nastavnik[] = [];
  ostaliNastavnici: Nastavnik[] = [];

  zaduzen: Nastavnik | null = null;
  izabranZaduzen: number = 0;

  ngOnInit(): void {
    this.predmetiS.dohvatanjeSvihPredmeta().subscribe(
      data => {
        this.sviPredmeti = data;
      }
    )

    this.nastavniciS.dohvatanjeSvihNastavnika().subscribe(
      data => {
        this.sviNastavnici = data;
      }
    )

    this.ucitajZaduzenog();
  }

  ucitajNastavnikeZaPredmet() {
    this.nastavniciS.dohvatanjeNastavnikaNaPredmetu(this.izabraniPredmet).subscribe(
      data => {
        this.nastavniciNaPredmetu = data;

        this.ostaliNastavnici = this.sviNastavnici.filter(n =>
          !this.nastavniciNaPredmetu.some(na => na.id === n.id)
        );
      }
    )

  }

  dodajNaPredmet(idNastavnik: number) {
    this.nastavniciS.dodavanjeNastavnikaNaPredemt(idNastavnik, this.izabraniPredmet).subscribe(
      data => {
        if (data != 0) {
          this.ucitajNastavnikeZaPredmet();
        }
      }
    )
  }

  obrisiSaPredmeta(idNastavnik: number) {
    this.nastavniciS.brisanjeNastavnikaSaPredemta(idNastavnik, this.izabraniPredmet).subscribe(
      data => {
        if (data != 0) {
          this.ucitajNastavnikeZaPredmet();
        }
      }
    )
  }

  ucitajZaduzenog() {
    this.nastavniciS.zaduzenZaDemonstratore().subscribe(
      nastavnik => {
        this.zaduzen = nastavnik;
      });
  }

  postaviZaduzenog() {
    this.nastavniciS.postaviZaduzenog(this.izabranZaduzen).subscribe(
      status => {
        if (status > 0) {
          this.ucitajZaduzenog();
        }
      });
  }

  ukloniZaduzenog() {
    if (this.zaduzen) {
      this.nastavniciS.ukloniZaduzenog(this.zaduzen.id).subscribe(
        status => {
          if (status > 0) {
            this.ucitajZaduzenog();
          }
        }
      );
    }
  }
}
