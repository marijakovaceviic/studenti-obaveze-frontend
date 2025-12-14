import { Component } from '@angular/core';
import { DemonstratoriService } from '../servisi/demonstratori.service';
import { DemonstratoriForma } from '../modeli/demonstratoriForma';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent {
  
  constructor(private demonstratoriS: DemonstratoriService){}

  forma: DemonstratoriForma = new DemonstratoriForma();

  ngOnInit(): void{
    this.demonstratoriS.aktivnaForma().subscribe(
      aktivnaF=>{
        this.forma = aktivnaF;
      }
    )
  }
}
