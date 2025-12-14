import { Component } from '@angular/core';
import { PredmetPrijavljeni } from '../modeli/predmetPrijavljeni';
import { DemonstratoriService } from '../servisi/demonstratori.service';

@Component({
  selector: 'app-demonstratori-prijavljeni',
  templateUrl: './demonstratori-prijavljeni.component.html',
  styleUrls: ['./demonstratori-prijavljeni.component.css']
})
export class DemonstratoriPrijavljeniComponent {
  prijave: PredmetPrijavljeni[] = [];

  constructor(private demonstratoriS: DemonstratoriService) {}

  ngOnInit(): void {
    this.demonstratoriS.prijavljeniStudentiPoPredmetima().subscribe(
      data => {
        this.prijave = data;
      }
    );
  }

  formatIndeksa(br: number): string {
    return br.toString().padStart(4, '0');
  }

  preuzmiExcel(idPredmet: number, sifra: string) {
    this.demonstratoriS.preuzimanjeSpiskaZaPredmet(idPredmet).subscribe(
      (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prijavljeni' + '_' + sifra +'.xlsx';
      a.click();
    });
  }
}
