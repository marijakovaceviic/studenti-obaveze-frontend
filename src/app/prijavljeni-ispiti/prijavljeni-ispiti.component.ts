import { Component } from '@angular/core';
import { PrijaveService } from '../servisi/prijave.service';
import { Student } from '../modeli/student';
import { Obaveza } from '../modeli/obaveza';

@Component({
  selector: 'app-prijavljeni-ispiti',
  templateUrl: './prijavljeni-ispiti.component.html',
  styleUrls: ['./prijavljeni-ispiti.component.css']
})
export class PrijavljeniIspitiComponent {

  constructor(private prijaveS: PrijaveService){}

  ulogovan: Student = new Student();
  prijavljeniIspiti: Obaveza[] = [];
  prijavljeniKlk: Obaveza[] = [];

  ngOnInit(): void {
    let student = localStorage.getItem("ulogovan");
    if (student != null) {
      this.ulogovan = JSON.parse(student);
    }

    this.prijaveS.prijaveZaIspit(this.ulogovan.id).subscribe(
      ispiti=>{
        this.prijavljeniIspiti = ispiti;
      }
    )

    this.prijaveS.prijaveZaKolokvijume(this.ulogovan.id).subscribe(
      klk =>{
        this.prijavljeniKlk = klk;
      }
    )
  }
}
