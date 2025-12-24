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
    console.log("jjjjjaaa")
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
          }
        )
      }
    }
    
  }
}
