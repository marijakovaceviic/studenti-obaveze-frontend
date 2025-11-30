import { Component } from '@angular/core';
import { Student } from '../modeli/student';
import { PrijaveService } from '../servisi/prijave.service';
import { Obaveza } from '../modeli/obaveza';

@Component({
  selector: 'app-prijavljeni-labovi',
  templateUrl: './prijavljeni-labovi.component.html',
  styleUrls: ['./prijavljeni-labovi.component.css']
})
export class PrijavljeniLaboviComponent {
  constructor(private prijaveS: PrijaveService){}
  
    ulogovan: Student = new Student();
    prijavljeniLabovi: Obaveza[] = [];
    prijavljeneOdbrane: Obaveza[] = [];
  
    ngOnInit(): void {
      let student = localStorage.getItem("ulogovan");
      if (student != null) {
        this.ulogovan = JSON.parse(student);
      }
  
      this.prijaveS.prijaveZaLabove(this.ulogovan.id).subscribe(
        labovi=>{
          this.prijavljeniLabovi = labovi;
        }
      )
  
      this.prijaveS.prijaveZaOdbrane(this.ulogovan.id).subscribe(
        odbrane =>{
          this.prijavljeneOdbrane = odbrane;
        }
      )
    }
}
