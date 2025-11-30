import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavezeService } from '../servisi/obaveze.service';
import { PrijaveService } from '../servisi/prijave.service';
import { Student } from '../modeli/student';
import { Obaveza } from '../modeli/obaveza';
import { PredajeService } from '../servisi/predaje.service';

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

  ngOnInit(): void{
    this.idObaveze = Number(this.route.snapshot.paramMap.get('idObaveze'));
    
    this.obavezeS.dohvatanjeObavezePoIdu(this.idObaveze).subscribe(
      data=>{
        if (data != null){
          this.obaveza = data;

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
    this.prijaveS.preuzimanjeSpiska(this.idObaveze).subscribe(
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

  preuzmiSveRadove(){
    this.predajeS.preuzimanjeSvihRadova(this.idObaveze).subscribe(
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
