import { Component } from '@angular/core';
import { NastavniciService } from '../servisi/nastavnici.service';
import { Nastavnik } from '../modeli/nastavnik';

@Component({
  selector: 'app-nastavnik-promena-lozinke',
  templateUrl: './nastavnik-promena-lozinke.component.html',
  styleUrls: ['./nastavnik-promena-lozinke.component.css']
})
export class NastavnikPromenaLozinkeComponent {

  constructor(private nastavniciS: NastavniciService){}
  staraLozinka: string = "";
  novaLozinka: string = "";
  potvrdaLozinke: string = "";
  uspeh: string = "";
  greska: string = "";

  ulogovan: Nastavnik = new Nastavnik();
    
  ngOnInit(): void{
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);
    }
  }

  promenaLozinke(){
    this.greska = "";
    this.uspeh = "";
    if (this.novaLozinka == this.potvrdaLozinke){
      this.nastavniciS.promenaLozinke(this.ulogovan.email, this.staraLozinka, this.novaLozinka).subscribe(
        status =>{
          if (status > 0){
            localStorage.removeItem("ulogovan");
            this.uspeh = "Lozinka je uspešno promenjena! Prijavite se ponovo da biste nastavli.";
          }
          else{
            this.greska = "Pogrešan email ili lozinka!";
          }
        }
      )
    }
    else{
      this.greska = "Potvrđena lozinka se razlikuje od unete nove lozinke!";
    }
  }
}
