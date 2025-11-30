import { Component } from '@angular/core';
import { NastavniciService } from '../servisi/nastavnici.service';

@Component({
  selector: 'app-admin-nastavnici',
  templateUrl: './admin-nastavnici.component.html',
  styleUrls: ['./admin-nastavnici.component.css']
})
export class AdminNastavniciComponent {

  constructor(private nastavniciS: NastavniciService){}

  ime: string = "";
  prezime: string = "";
  email: string = "";
  greska: string = "";

  dodajNalog(){
    this.nastavniciS.registracija(this.ime, this.prezime, this.email).subscribe(
      data=>{
        if (data == 0){
          this.greska = "Nastavnik već ima nalog";
        }
        else{
          //osveziti + poruka
        }
      }
    )
  }
}
