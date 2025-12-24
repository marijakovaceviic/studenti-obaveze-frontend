import { Component } from '@angular/core';
import { Student } from '../modeli/student';
import { Predaja } from '../modeli/predaja';
import { PredajeService } from '../servisi/predaje.service';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-predaja',
  templateUrl: './predaja.component.html',
  styleUrls: ['./predaja.component.css']
})
export class PredajaComponent {

  ulogovan: Student = new Student();
  poslatiDomaci: Predaja[] = [];

  constructor(private predajeS: PredajeService) {}

  ngOnInit(): void {
    const student = localStorage.getItem("ulogovan");
    if (student) {
      this.ulogovan = JSON.parse(student);

      this.predajeS.predatiDomaci(this.ulogovan.id).subscribe(
        data=> {
          this.poslatiDomaci = data;
        }
        );
    }
  }

  preuzmiFajl(idObaveze: number) {
    const student = this.ulogovan.email.substring(0, 8);

    this.predajeS.preuzimanjeDomaceg(idObaveze, student).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Fajl nije pronađen!');
        } else {
          alert('Došlo je do greške prilikom preuzimanja fajla!');
        }
        return EMPTY; 
      })
    ).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = student + ".zip";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
