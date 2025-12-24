import { Component } from '@angular/core';
import { ObavezeService } from '../servisi/obaveze.service';
import { PrijaveService } from '../servisi/prijave.service';
import { ActivatedRoute } from '@angular/router';
import { Obaveza } from '../modeli/obaveza';
import { ChartConfiguration } from 'chart.js';
import { forkJoin, switchMap, of } from 'rxjs';
import { PredajeService } from '../servisi/predaje.service';

@Component({
  selector: 'app-predmet-statistika',
  templateUrl: './predmet-statistika.component.html',
  styleUrls: ['./predmet-statistika.component.css']
})
export class PredmetStatistikaComponent {
  constructor(private obavezeS: ObavezeService, private prijaveS: PrijaveService, private route: ActivatedRoute,
    private predajeS: PredajeService){}

  idPredmet: number = 0;
  obaveze: Obaveza[] = [];
  prijaveBrojevi: number[] = [];
  predajeBrojevi: number[] = [];

  obavezePrijave: Obaveza[] = [];
  obavezePredaje: Obaveza[] = [];
  labelePrijave: string[] = [];
  labelePredaje: string[] = [];

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartType = 'bar';
  barChartLegend = true;

  public barChartData1: ChartConfiguration<'bar'| 'line'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Broj prijavljenih', backgroundColor: '#748fb8ff', hoverBackgroundColor: '#455c80ff', borderColor: '#748fb8ff' }
    ]
  };

  public barChartData2: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Broj predatih', backgroundColor: '#97aecfff', hoverBackgroundColor: '#647999ff', borderColor: '#97aecfff'}
    ]
  };


  ngOnInit(): void {
    this.idPredmet = Number(this.route.snapshot.paramMap.get('idPredmet'));

    const obavezeObservable = this.obavezeS.dohvatanjeIsteklihObavezaZaPredmet(this.idPredmet);

    const brojPrijavaObservable = obavezeObservable.pipe(
      switchMap(obaveze => {
        this.obavezePrijave = obaveze.filter(o => o.tip.toLowerCase() !== 'domaci');
        if (this.obavezePrijave.length === 0) {
          return of([]); 
        }
        return forkJoin(this.obavezePrijave.map(o => this.prijaveS.brojPrijavljenih(o.id)));
      })
    );

    const brojPredajaObservable = obavezeObservable.pipe(
      switchMap(obaveze => {
        this.obavezePredaje = obaveze.filter(o => o.tip.toLowerCase() === 'domaci');
        if (this.obavezePredaje.length === 0) {
          return of([]); 
        }
        return forkJoin(this.obavezePredaje.map(o => this.predajeS.brojPredatihRadova(o.id)));
      })
    );

    forkJoin([obavezeObservable, brojPrijavaObservable, brojPredajaObservable]).subscribe(([obaveze, prijave, predaje]) => {
      this.obaveze = obaveze;
      this.obavezePrijave = this.obaveze.filter(o => o.tip.toLowerCase() !== 'domaci');

      this.labelePrijave = this.obavezePrijave.map(o => o.naziv);
      this.labelePredaje = this.obavezePredaje.map(o => o.naziv);
      this.prijaveBrojevi = prijave;
      this.predajeBrojevi = predaje;

      this.barChartData1.labels = this.labelePrijave;
      this.barChartData1.datasets[0].data = this.prijaveBrojevi;

      this.barChartData2.labels = this.labelePredaje;
      this.barChartData2.datasets[0].data = this.predajeBrojevi;
      console.log(this.prijaveBrojevi);
      console.log(this.predajeBrojevi);
    });

  }

}
