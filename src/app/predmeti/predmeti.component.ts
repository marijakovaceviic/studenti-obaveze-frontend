import { Component } from '@angular/core';
import { PredmetiService } from '../servisi/predmeti.service';

@Component({
  selector: 'app-predmeti',
  templateUrl: './predmeti.component.html',
  styleUrls: ['./predmeti.component.css']
})
export class PredmetiComponent {

  constructor(private predmetiS: PredmetiService){}

  naziv:string = "";
  sifra:string = "";
  odsek:string = "";
  godina:number = 0;
  greska:string = "";
  uspeh: string = "";

  osvezavanjeForme(){
    this.naziv= "";
    this.sifra = "";
    this.odsek = "";
    this.godina = 0;
  }

  dodavanjePredemeta(){
    this.greska = "";
    this.uspeh = "";

    if (this.naziv == ""){
      this.greska = "Nije unet naziv!";
    } 
    else if (this.sifra == ""){
      this.greska = "Nije uneta šifra!";
    }
    else if (this.odsek == ""){
      this.greska = "Nije izabran odsek!";
    }
    else if (this.godina == 0){
      this.greska = "Nije izabrana godina!";
    }
    else{
      this.predmetiS.dodavanjePredmeta(this.naziv, this.sifra, this.godina, this.odsek).subscribe(
        data =>{
          if (data != 0){
            this.uspeh = "Uspesno dodat predmet!";
            this.osvezavanjeForme();
          }
          else{
            this.greska = "Već postoji predmet sa unetom šifrom!";
          }
        }
      )
    }
  }
}
