import { Component } from '@angular/core';
import { ObavezeService } from '../servisi/obaveze.service';
import { PrijaveService } from '../servisi/prijave.service';
import { ActivatedRoute } from '@angular/router';
import { Obaveza } from '../modeli/obaveza';
import { ChartConfiguration } from 'chart.js';
import { forkJoin, switchMap, of } from 'rxjs';
import { PredajeService } from '../servisi/predaje.service';
import { PredmetiService } from '../servisi/predmeti.service';
import { Predmet } from '../modeli/predmet';

@Component({
  selector: 'app-predmet-statistika',
  templateUrl: './predmet-statistika.component.html',
  styleUrls: ['./predmet-statistika.component.css']
})
export class PredmetStatistikaComponent {
  constructor(private obavezeS: ObavezeService, private prijaveS: PrijaveService, private route: ActivatedRoute,
    private predajeS: PredajeService, private predmetiS: PredmetiService){}

  idPredmet: number = 0;
  predmet: Predmet = new Predmet();
  obaveze: Obaveza[] = [];
  prijaveBrojevi: number[] = [];
  predajeBrojevi: number[] = [];

  obavezePrijave: Obaveza[] = [];
  obavezePredaje: Obaveza[] = [];
  labelePrijave: string[] = [];
  labelePredaje: string[] = [];

  barChartOptions: ChartConfiguration<'bar' | 'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 15
        }
      }
    }
  };
  barChartType = 'bar';
  barChartLegend = true;

  public barChartData1: ChartConfiguration<'bar' | 'line'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Broj prijavljenih studenata', backgroundColor: '#6a85acff', hoverBackgroundColor: '#455c80ff', borderColor: '#748fb8ff' }, 
      { label: 'Ukupan broj studenata', data: [], type: 'line', backgroundColor: '#2e4e8bff',
        borderColor: '#2e4e8bff', borderWidth: 2, pointRadius: 4, fill: false, tension: 0, pointBackgroundColor: '#2e4e8bff'
      }
    ]
  };

  public barChartData2: ChartConfiguration<'bar' | 'line'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Broj predatih radova', backgroundColor: '#97aecfff', hoverBackgroundColor: '#647999ff', borderColor: '#97aecfff'},
      { label: 'Ukupan broj studenata', data: [], type: 'line', backgroundColor: '#203864ff',
        borderColor: '#2e4e8bff', borderWidth: 2, pointRadius: 4, fill: false, tension: 0, pointBackgroundColor: '#2e4e8bff'
      }
    ]
  };


  ngOnInit(): void {
    this.idPredmet = Number(this.route.snapshot.paramMap.get('idPredmet'));
    this.predmetiS.dohvatanjePredmetaPoId(this.idPredmet).subscribe(
      predmet =>{
        this.predmet = predmet;
      }
    )

    const obavezeObservable = this.obavezeS.dohvatanjeIsteklihObavezaZaPredmet(this.idPredmet);

    const brojStudenataObservable = this.predmetiS.brojStudenataKojiPrateObavestenjaZaPredmet(this.idPredmet);

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

    forkJoin([obavezeObservable, brojPrijavaObservable, brojPredajaObservable, brojStudenataObservable]).
    subscribe(([obaveze, prijave, predaje, brStudenata]) => {
      this.obaveze = obaveze;
      this.obavezePrijave = this.obaveze.filter(o => o.tip.toLowerCase() !== 'domaci');

      this.labelePrijave = this.obavezePrijave.map(o => o.naziv);
      this.labelePredaje = this.obavezePredaje.map(o => o.naziv);
      this.prijaveBrojevi = prijave;
      this.predajeBrojevi = predaje;

      this.barChartData1.labels = this.labelePrijave;
      this.barChartData1.datasets[0].data = this.prijaveBrojevi;

      this.barChartData1.datasets[1].data = Array(this.labelePrijave.length).fill(brStudenata);

      this.barChartData2.labels = this.labelePredaje;
      this.barChartData2.datasets[0].data = this.predajeBrojevi;
      
      this.barChartData2.datasets[1].data = Array(this.labelePredaje.length).fill(brStudenata);

    });

  }

}
