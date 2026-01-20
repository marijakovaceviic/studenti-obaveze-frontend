import { Component } from '@angular/core';
import { Student } from '../modeli/student';
import { StudentService } from '../servisi/student.service';
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

  staraLozinka: string = "";
  novaLozinka: string = "";
  potvrdaLozinke: string = "";
  greskaLozinka: string = "";
  greskaPredmeti: string = "";
  uspeh: string = "";
  uspehPredmeti: string = "";

  izabraneGodine:number[] = [];
  odsek:string = "";
  godineZaPrikaz: number[] = [1, 2, 3, 4, 5];

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
          this.filtriraniPredmeti = this.sviPredmeti;  
        }
      )
    }
  }

  promenaLozinke(){
    this.greskaLozinka = "";
    this.uspeh = "";

    let regexLozinka = /^(?=[a-zA-Z])(?=.*\d)(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{6,10}$/;

    if (this.staraLozinka == "") {
      this.greskaLozinka = "Nije uneta stara lozinka!";
    }
    else if(this.novaLozinka == ""){
      this.greskaLozinka = "Nije uneta nova lozinka!";
    }
    else if(this.potvrdaLozinke == ""){
      this.greskaLozinka = "Nije uneta potvrda nove lozinke!";
    }
    else if (!regexLozinka.test(this.novaLozinka)){
      this.greskaLozinka = "Nova lozinka mora počinjati slovom i mora imati od 6 do 10 karaktera, od toga bar jedno veliko slovo, tri mala, jedan broj i jedan specijalni karakter!";
    }
    else if (this.novaLozinka != this.potvrdaLozinke){
      this.greskaLozinka = "Potvrda lozinke se razlikuje od unete nove lozinke";
    }
    else{
        this.studentS.promenaLozinke(this.ulogovan.email, this.staraLozinka, this.novaLozinka).subscribe(
          data =>{
            if (data != 0){
              this.uspeh = "Uspešno promenjena lozinka! Prijavite se ponovo.";
              this.staraLozinka = "";
              this.novaLozinka = "";
              this.potvrdaLozinke = "";
              localStorage.removeItem("ulogovan");
            }
            else{
              this.greskaLozinka = "Pogrešna lozinka!"
            }
          }
        )
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
    this.greskaPredmeti = "";

    this.godineZaPrikaz = this.izabraneGodine.length === 0 ? [1,2,3,4,5] : this.izabraneGodine;

    this.filtriraniPredmeti = this.sviPredmeti.filter(p => 
      (this.izabraneGodine.length === 0 || this.izabraneGodine.includes(p.godina)) &&
      (this.odsek === "" || p.odsek === this.odsek)
    );
  }

  izborPredmeta(id: number, event:any){
    this.greskaPredmeti = "";
    if (event.target.checked) {
      this.izabraniPredmeti.push(id);
    } else {
      this.izabraniPredmeti = this.izabraniPredmeti.filter(p => p !== id);
    }
  }

  sacuvajIzbor(){
    this.greskaPredmeti = "";

    if (this.izabraniPredmeti.length === 0 && this.izabraneGodine.length === 0 && this.odsek === "") {
      this.greskaPredmeti = "Morate izabrati godinu, odsek ili predmete!"
      return;
    }
    const predmetiZaSlanje = this.izabraniPredmeti.length > 0 ? this.izabraniPredmeti : this.filtriraniPredmeti.map(p => p.id);
    
    this.predmetiS.cuvanjeIzabranihPredmeta(predmetiZaSlanje, this.ulogovan.id).subscribe(
      data =>{
        if (data != 0){
          this.izabraniPredmeti = [];
          this.izabraneGodine = [];
          this.odsek = "";
          this.filtriraniPredmeti = this.sviPredmeti;
          this.uspehPredmeti = "Uspešan izbor predmeta";
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
