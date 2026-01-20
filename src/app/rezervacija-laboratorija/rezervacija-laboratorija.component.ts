import { Component } from '@angular/core';
import { RezervacijeService } from '../servisi/rezervacije.service';
import { Laboratorija } from '../modeli/laboratorija';
import { Nastavnik } from '../modeli/nastavnik';

@Component({
  selector: 'app-rezervacija-laboratorija',
  templateUrl: './rezervacija-laboratorija.component.html',
  styleUrls: ['./rezervacija-laboratorija.component.css']
})
export class RezervacijaLaboratorijaComponent {
  datum: string = "";
  vremeOd: string = "";
  vremeDo: string = "";
  nazivObaveze: string = "";
  akronim: string = "";

  greska: string = "";
  uspeh: string = "";

  dostupneLaboratorije: Laboratorija[] = [];
  izabraneLaboratorije: number[] = [];
  ulogovan: Nastavnik = new Nastavnik();

  constructor(private rezeravijeS: RezervacijeService) {}

   ngOnInit(): void{
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);

    } 
  }

  slobodneLaboratorije() {
    if (!this.datum || !this.vremeOd || !this.vremeDo) return;

    this.rezeravijeS.slobodneLaboratorije(this.datum, this.vremeOd, this.vremeDo).subscribe(
      lab => {
        this.dostupneLaboratorije = lab;
      }
    )
  }


  izbor(idLaboratorije: number) {
    const i = this.izabraneLaboratorije.indexOf(idLaboratorije);

    if (i >= 0) {
      this.izabraneLaboratorije.splice(i, 1);
    } else {
      this.izabraneLaboratorije.push(idLaboratorije);
    }
  }

  rezervisi() {
    this.greska = "";
    this.uspeh = "";
    if (this.nazivObaveze == ""){
      this.greska = "Nije unet naziv obaveze!";
    } 
    else if (this.akronim == ""){
      this.greska = "Nije unet akronim predmeta za koji se vrši rezervacija!";
    }
    else if (this.datum == ""){
      this.greska = "Nije izabran datum!";
    }
    else if (this.vremeOd == "" || this.vremeDo == ""){
      this.greska = "Nije izabrano vreme početka odnosno kraja obaveze!"
    }
    else{
      let [satiOd, minuteOd] = this.vremeOd.split(':').map(Number);
      let [satiDo, minuteDo] = this.vremeDo.split(':').map(Number);

      let datumVremeOd = new Date(this.datum);
      datumVremeOd.setHours(satiOd, minuteOd, 0, 0);

      let datumVremeDo = new Date(this.datum);
      datumVremeDo.setHours(satiDo, minuteDo, 0, 0);

      let sada = new Date();

      if (datumVremeOd < sada) {
        this.greska = "Rezervacija mora početi u budućnosti!";
        return;
      }

      if (datumVremeDo <= datumVremeOd) {
        this.greska = "Vreme početka rezervacije mora biti pre vremena kraja!";
        return;
      }


      for(let lab of this.izabraneLaboratorije){
        this.rezeravijeS.novaRezervacija(lab, this.nazivObaveze, this.ulogovan.id, this.datum, this.vremeOd, this.vremeDo, this.akronim).subscribe(
          rez=>{
            if (rez != 0){
              this.uspeh = "Uspešna rezervacija!";
              this.nazivObaveze = "";
              this.akronim = "";
              this.datum = "";
              this.vremeOd = "";
              this.vremeDo = "";
              this.izabraneLaboratorije = [];
            }
            else{
              this.greska = "Neuspešna rezervacja!";
            }
          }
        )
      }
    }
    
  }
}
