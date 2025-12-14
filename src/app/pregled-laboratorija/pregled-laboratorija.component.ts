import { Component } from '@angular/core';
import { RezervacijeService } from '../servisi/rezervacije.service';
import { Laboratorija } from '../modeli/laboratorija';

@Component({
  selector: 'app-pregled-laboratorija',
  templateUrl: './pregled-laboratorija.component.html',
  styleUrls: ['./pregled-laboratorija.component.css']
})
export class PregledLaboratorijaComponent {
  constructor(private rezervacijeS: RezervacijeService) {}
  laboratorije: Laboratorija[] = [];
  izabranaLab: number = 0;
  
  ngOnInit() {
    this.rezervacijeS.sveLaboratorije().subscribe(
      data=>{
        this.laboratorije = data;
      }
    )

  }
}
