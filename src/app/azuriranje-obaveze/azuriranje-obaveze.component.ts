import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavezeService } from '../servisi/obaveze.service';
import { Nastavnik } from '../modeli/nastavnik';
import { Predmet } from '../modeli/predmet';
import { PredmetiService } from '../servisi/predmeti.service';

@Component({
  selector: 'app-azuriranje-obaveze',
  templateUrl: './azuriranje-obaveze.component.html',
  styleUrls: ['./azuriranje-obaveze.component.css']
})
export class AzuriranjeObavezeComponent {
  constructor(private route: ActivatedRoute, private obavezeS: ObavezeService, private predmetiS: PredmetiService){}
  idObaveze: number = 0;
  ulogovan: Nastavnik = new Nastavnik();
  tip: string = "";
  naziv: string = "";
  pocetak: string = "";
  kraj: string = "";
  opis: string = "";
  predmet:number = 0;

  predmeti: Predmet[] = [];
  greska: string = "";
  uspeh: string = "";

  ngOnInit(): void{
    this.idObaveze = Number(this.route.snapshot.paramMap.get('idObaveze'));
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);
      this.predmetiS.dohvatanjePredmetaZaNastavnika(this.ulogovan.id).subscribe(
        predmeti=>{
          this.predmeti = predmeti;
        }
      )

      this.obavezeS.dohvatanjeObavezePoIdu(this.idObaveze).subscribe(
        obaveza =>{
          this.naziv = obaveza.naziv;
          this.tip = obaveza.tip;
          this.opis = obaveza.opis;
          this.predmet = obaveza.predmet;
          this.pocetak = obaveza.pocetak;
          this.kraj = obaveza.kraj;
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
          this.obavezeS.azuriranjeObaveze(this.idObaveze, this.naziv, this.opis, this.tip, this.pocetak, this.kraj, this.predmet).subscribe(
            status =>{
              if (status > 0){
                this.uspeh = "Uspešno sačuvane promene!";
              }
            }
          )
            
        }
      }
    }
}
