import { Component } from '@angular/core';
import { StudentService } from '../servisi/student.service';
import { PredmetiService } from '../servisi/predmeti.service';
import { Predmet } from '../modeli/predmet';
import { Student } from '../modeli/student';
import { DemonstratoriService } from '../servisi/demonstratori.service';
import { DemonstratoriForma } from '../modeli/demonstratoriForma';
import { EmailService } from '../servisi/email.service';

@Component({
  selector: 'app-prijava-demenostratori',
  templateUrl: './prijava-demenostratori.component.html',
  styleUrls: ['./prijava-demenostratori.component.css']
})
export class PrijavaDemenostratoriComponent {

  constructor(private studentS:StudentService, private predmetiS:PredmetiService, private demonstratoriS:DemonstratoriService,
    private emailS: EmailService){}

  izabraneGodine:number[] = [];
  odsek:string = "";
  godineZaPrikaz: number[] = [1, 2, 3, 4];

  sviPredmeti: Predmet[] = [];
  izabraniPredmeti: number[] = [];
  filtriraniPredmeti: Predmet[] = [];
  ulogovan: Student = new Student();
  forma: DemonstratoriForma = new DemonstratoriForma();
  
  greska: string = "";
  uspeh: string = "";

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

      this.demonstratoriS.aktivnaForma().subscribe(
        aktivnaF=>{
          this.forma = aktivnaF;
        }
      )
    }
  }

  izborGodina(godina:number, event: any){
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

  prijava(){
    if (this.izabraniPredmeti.length == 0 ) {
      this.greska = "Morate izabrati predmete za koje se prijavljujete!";
    }
    this.demonstratoriS.novaPrijava(this.ulogovan.id, this.forma.id, this.izabraniPredmeti).subscribe(
      status =>{
        if (status > 0){
          this.uspeh = "Uspešna prijava!";
          this.filtriraniPredmeti = this.sviPredmeti;
          this.izabraniPredmeti = [];
          this.izabraneGodine = [];
          this.odsek = "";
          this.emailS.uspesnaPrijavaZaDemonstratore(this.ulogovan.id).subscribe(
            
          )
        }
      }
    )
  }

  preuzimanjeKonkursa(){
    this.demonstratoriS.dohvatanjeKonkursa(this.forma.id).subscribe(
      blob =>{
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = "konkurs.pdf";   
        a.click();

        window.URL.revokeObjectURL(url);
      }
    )
  }
}
