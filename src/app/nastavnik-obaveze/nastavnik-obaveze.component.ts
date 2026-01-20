import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavezeService } from '../servisi/obaveze.service';
import { PrijaveService } from '../servisi/prijave.service';
import { Student } from '../modeli/student';
import { Obaveza } from '../modeli/obaveza';
import { PredajeService } from '../servisi/predaje.service';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Nastavnik } from '../modeli/nastavnik';

@Component({
  selector: 'app-nastavnik-obaveze',
  templateUrl: './nastavnik-obaveze.component.html',
  styleUrls: ['./nastavnik-obaveze.component.css']
})
export class NastavnikObavezeComponent {
  
  constructor(private route: ActivatedRoute, private obavezeS: ObavezeService, private prijaveS: PrijaveService,
    private predajeS: PredajeService) {}

  idObaveze: number = 0;
  prijavljeni: Student[] = [];
  obaveza: Obaveza = new Obaveza();

  brojRadova: number = 0;

  ulogovan: Nastavnik = new Nastavnik();
  obavezeZaNastavnika: Obaveza[] = [];
  dozvoljenPrikaz: boolean = false;
  greskaPrikaz: string = "";

  ngOnInit(): void{
    this.idObaveze = Number(this.route.snapshot.paramMap.get('idObaveze'));
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);
    }

    this.obavezeS.dohvatanjeObavezePoIdu(this.idObaveze).subscribe(
      data=>{
        if (data != null){
          this.obaveza = data; 

          this.obavezeS.dohvatanjeObavezaZaNastavnika(this.ulogovan.id).subscribe(
            obaveze=>{
              this.obavezeZaNastavnika = obaveze; 
              const nadjena = this.obavezeZaNastavnika.some(o => o.id === this.obaveza.id);

              if (nadjena) {
                this.dozvoljenPrikaz = true;
              } else {
                this.dozvoljenPrikaz = false;
                this.greskaPrikaz = "Nemate dozvolu za pristup stranici!";
              }
            }
          )

          if (this.obaveza.tip != 'domaci'){
            this.prijaveS.svePrijaveZaObavezu(this.idObaveze).subscribe(
              prijave =>{
                this.prijavljeni = prijave;
              }
            )
          }
          else{
            this.predajeS.brojPredatihRadova(this.idObaveze).subscribe(
              broj=>{
                this.brojRadova = broj;
              }
            )
          }
        }
      }
    )
  }
  
  preuzmiExcel() {
    this.prijaveS.preuzimanjeSpiska(this.idObaveze).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Spisak studenata za ovaj predmet nije pronađen.');
        } else {
          alert('Došlo je do greške prilikom preuzimanja spiska studenata.');
        }
        return EMPTY;
      })
    ).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prijavljeni.xlsx';
        a.click();
      });
  }

  formatIndeksa(br: number): string {
    return br.toString().padStart(4, '0');
  }

  preuzmiSveRadove() {
    this.predajeS.preuzimanjeSvihRadova(this.idObaveze).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Fajl nije pronađen!');
        } else {
          alert('Došlo je do greške prilikom preuzimanja fajla!');
        }
        return EMPTY;
      })).subscribe(
        (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `predati_radovi_za_obavezu${this.idObaveze}.zip`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
      );
  }

}
