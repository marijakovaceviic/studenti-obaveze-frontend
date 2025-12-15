import { Component } from '@angular/core';
import { PredmetiService } from '../servisi/predmeti.service';
import { Student } from '../modeli/student';
import { Predmet } from '../modeli/predmet';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {
  constructor(private predmetiS: PredmetiService){}

  ulogovan: Student = new Student();
  godine: number[] = [];
  aktivnaGodina: number = 0;

  sviPredmetiStudenta: Predmet[] = [];
  predmetiZaGodinu: Predmet[] = [];
    
  ngOnInit():void {
    let student = localStorage.getItem("ulogovan");
    if (student != null) {
      this.ulogovan = JSON.parse(student);
      if (this.ulogovan.tip == "student"){
        this.predmetiS.dohvatanjeGodinaKojeStudentPrati(this.ulogovan.id).subscribe(
          god=>{
            if (god.length > 0){
              this.godine = god;
              this.selektujGodinu(this.godine[0]);
            } 
            else{
              this.godine = [1, 2, 3, 4];
              this.selektujGodinu(this.godine[0]);
            }
          }
        )
      }
      else {
        this.godine = [1, 2, 3, 4];
        this.selektujGodinu(this.godine[0]);
      }
      
    }
    else{
      this.godine = [1, 2, 3, 4];
      this.selektujGodinu(this.godine[0]);
    }
  }

  selektujGodinu(g: number) {
    this.aktivnaGodina = g;
    if (this.ulogovan != null){
      this.predmetiS.dohvatanjePredmetaSaAktivnimObavezama(this.ulogovan.id, g).subscribe(
      predmeti=>{
        if (predmeti.length > 0){
          this.predmetiZaGodinu = predmeti;
        }
        else{
          this.predmetiS.dohvatanjePredmetaSaAktivnimObavezamaZaGodinu(g).subscribe(
            p=>{
              this.predmetiZaGodinu = p;
            }
          )
        }
      }
    )
    }
    else{
      this.predmetiS.dohvatanjePredmetaSaAktivnimObavezamaZaGodinu(g).subscribe(
        p=>{
          this.predmetiZaGodinu = p;
        }
      )
    }
  }

}
