import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavezeService } from '../servisi/obaveze.service';
import { Obaveza } from '../modeli/obaveza';

@Component({
  selector: 'app-predmet-obaveze',
  templateUrl: './predmet-obaveze.component.html',
  styleUrls: ['./predmet-obaveze.component.css']
})
export class PredmetObavezeComponent {

  constructor(private route: ActivatedRoute, private obavezeS: ObavezeService) {}

  idPredmet: number = 0;
  obaveze: Obaveza[] = [];

  ngOnInit(): void {
    this.idPredmet = Number(this.route.snapshot.paramMap.get('idPredmet'));
    
    this.obavezeS.dohvatanjeObavezaZaPredmet(this.idPredmet).subscribe(
      obaveze=>{
        this.obaveze = obaveze;
      }
    )
  }
}
