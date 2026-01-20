import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavezeService } from '../servisi/obaveze.service';
import { Obaveza } from '../modeli/obaveza';
import { PredmetiService } from '../servisi/predmeti.service';
import { Predmet } from '../modeli/predmet';

@Component({
  selector: 'app-predmet-obaveze',
  templateUrl: './predmet-obaveze.component.html',
  styleUrls: ['./predmet-obaveze.component.css']
})
export class PredmetObavezeComponent {

  constructor(private route: ActivatedRoute, private obavezeS: ObavezeService, private predmetiS: PredmetiService) {}

  idPredmet: number = 0;
  obaveze: Obaveza[] = [];
  predmet: Predmet = new Predmet();

  ngOnInit(): void {
    this.idPredmet = Number(this.route.snapshot.paramMap.get('idPredmet'));
    
    this.predmetiS.dohvatanjePredmetaPoId(this.idPredmet).subscribe(
      predmet=>{
        this.predmet = predmet;
      }
    )
    
    this.obavezeS.dohvatanjeObavezaZaPredmet(this.idPredmet).subscribe(
      obaveze=>{
        this.obaveze = obaveze;
      }
    )
  }
}
