import { Component } from '@angular/core';
import { Student } from '../modeli/student';
import { StudentService } from '../servisi/student.service';
import * as CryptoJS from 'crypto-js';
import { Predmet } from '../modeli/predmet';
import { PredmetiService } from '../servisi/predmeti.service';

@Component({
  selector: 'app-podesavanja',
  templateUrl: './podesavanja.component.html',
  styleUrls: ['./podesavanja.component.css']
})
export class PodesavanjaComponent {

  constructor(private studentS:StudentService, private predmetiS:PredmetiService){}

  aktivanTab: string = 'profil';
  ulogovan: Student = new Student();

  staraLozinka:string = "";
  novaLozinka:string = "";
  potvrdaLozinke:string = "";
  greska:string = "";

  izabraneGodine:number[] = [];
  odsek:string = "";
  godineZaPrikaz: number[] = [1, 2, 3, 4];

  sviPredmeti: Predmet[] = [];
  izabraniPredmeti: number[] = [];
  filtriraniPredmeti: Predmet[] = [];

  prikaziIzabrane: boolean = false;
  zapamceniIzborPredmeta: Predmet[] = [];

  ngOnInit(): void {
    let student = localStorage.getItem("ulogovan");
    if (student != null) {
      this.ulogovan = JSON.parse(student);

      this.predmetiS.dohvatanjeSvihPredmeta().subscribe(
        predmeti=>{
          this.sviPredmeti = predmeti;
          this.filtriraniPredmeti = this.sviPredmeti; //mislim da mi ne treba vise ovo
        }
      )
    }
  }

  promenaLozinke(){
    let regexLozinka = /^(?=[a-zA-Z])(?=.*\d)(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{6,10}$/;

    if (this.staraLozinka == "") {
      this.greska = "Nije uneta stara lozinka!";
    }
    else if(this.novaLozinka == ""){
      this.greska = "Nije uneta nova lozinka!";
    }
    else if(this.potvrdaLozinke == ""){
      this.greska = "Nije uneta potvrda nove lozinke!";
    }
    else if (!regexLozinka.test(this.novaLozinka)){
      this.greska = "Nova lozinka nije u dobrom formatu!";
    }
    else if (this.novaLozinka != this.potvrdaLozinke){
      this.greska = "Potvrda lozinke se razlikuje od unete nove lozinke";
    }
    else{
      const kriptovanaLozinka = CryptoJS.SHA256(this.staraLozinka).toString();
      const kriptovanaNova = CryptoJS.SHA256(this.novaLozinka).toString();
      if (kriptovanaLozinka != kriptovanaNova){
        this.greska = "Netačna stara lozinka!";
      }
      else{
        this.studentS.promenaLozinke(this.ulogovan.email, kriptovanaNova).subscribe(
          data =>{
            if (data != 0){
              this.greska = "Uspešno promenjena lozinka!";
              //resetovati formu
            }
          }
        )
      }
    }
  }

  izborGodinaZaPracenje(godina:number, event: any){
    if (event.target.checked) {
      this.izabraneGodine.push(godina);

    } 
    else {
      this.izabraneGodine = this.izabraneGodine.filter(g => g !== godina);
    }
    this.osveziPrikaz();
  }


  osveziPrikaz() {
    this.godineZaPrikaz = this.izabraneGodine.length === 0 ? [1,2,3,4] : this.izabraneGodine;

    this.filtriraniPredmeti = this.sviPredmeti.filter(p => 
      (this.izabraneGodine.length === 0 || this.izabraneGodine.includes(p.godina)) &&
      (this.odsek === "" || p.odsek === this.odsek)
    );
  }

  izborPredmeta(id: number, event:any){
    if (event.target.checked) {
      this.izabraniPredmeti.push(id);
    } else {
      this.izabraniPredmeti = this.izabraniPredmeti.filter(p => p !== id);
    }
  }

  sacuvajIzbor(){
    if (this.izabraniPredmeti.length == 0 && this.izabraneGodine.length == 0 && this.odsek == "") return;
    else if (this.izabraniPredmeti.length == 0 ){
      this.izabraniPredmeti = this.filtriraniPredmeti.map(p => p.id)
    }
    this.predmetiS.cuvanjeIzabranihPredmeta(this.izabraniPredmeti, this.ulogovan.id).subscribe(
      data =>{
        if (data != 0){
          //osvezavanje forme, poruka
        }
      }
    )
  }

  dohvatiIzabranePredmete(){
    this.prikaziIzabrane = !this.prikaziIzabrane; 

    if (this.prikaziIzabrane){
      this.predmetiS.dohvatanjeIzabranihPredmeta(this.ulogovan.id).subscribe(
        predmeti =>{
          this.zapamceniIzborPredmeta = predmeti;
        }
      )
    }
  }

  formatIndeksa(br: number): string {
    return br.toString().padStart(4, '0');
  }
}
