import { Component } from '@angular/core';
import { Predmet } from '../modeli/predmet';
import { ObavezeService } from '../servisi/obaveze.service';
import { PredmetiService } from '../servisi/predmeti.service';
import { Nastavnik } from '../modeli/nastavnik';
import { Obaveza } from '../modeli/obaveza';
import { EmailService } from '../servisi/email.service';

@Component({
  selector: 'app-nastavnik-otvaranje-forme',
  templateUrl: './nastavnik-otvaranje-forme.component.html',
  styleUrls: ['./nastavnik-otvaranje-forme.component.css']
})
export class NastavnikOtvaranjeFormeComponent {

  constructor(private obavezeS: ObavezeService, private predmetiS: PredmetiService, private emailS: EmailService){}

  tip: string = "";
  naziv: string = "";
  pocetak: string = "";
  kraj: string = "";
  opis: string = "";
  predmet:number = 0;

  predmeti: Predmet[] = [];
  ulogovan: Nastavnik = new Nastavnik();
  greska: string = "";
  uspeh: string = "";

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

  sacuvajObavezu(){
    this.greska = "";
    this.uspeh = "";
    
    if (this.tip == ""){
      this.greska = "Nije izabran tip obaveze!";
    }
    else if (this.naziv == ""){
      this.greska = "Obaveza mora imati naziv!";
    }
    else if (this.pocetak == ""){
      this.greska = "Nije izbarano vreme početka forme!";
    }
    else if (this.kraj == ""){
      this.greska = "Nije izbarano vreme završetka forme!";
    }
    else{
      let datumPocetka = new Date(this.pocetak);
      let datumKraja = new Date(this.kraj);
      let danasnji = new Date();
      if (datumPocetka < danasnji){
        this.greska = "Datum početka forme mora biti u budućnosti!";
      }
      else if (datumPocetka > datumKraja){
        this.greska = "Datum završetka forme mora biti nakon datuma otvaranja forme!";
      }
      else{
        this.obavezeS.dodavanjeObaveze(this.tip, this.predmet, this.naziv, this.opis, this.pocetak, this.kraj).subscribe(
          id=>{
            if (id != null){
              this.uspeh = "Obaveza je uspešno dodata!";
              this.emailS.otvorenaObaveza(id).subscribe(

              )
              this.pocetak = "";
              this.kraj = "";
              this.tip = "";
              this.naziv = "";
              this.opis = "";
              this.predmet = 0;
            }
            else{
              this.greska = "Došlo je do greške prilikom rezervacije!";
            }
          }
        )
      }
    }
  }
}
