import { Component, ViewChildren, QueryList } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ObavezeService } from '../servisi/obaveze.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin-statistika-godine',
  templateUrl: './admin-statistika-godine.component.html',
  styleUrls: ['./admin-statistika-godine.component.css']
})
export class AdminStatistikaGodineComponent {
  @ViewChildren(BaseChartDirective)
  charts!: QueryList<BaseChartDirective>;
  constructor(private obavezeS: ObavezeService) { }

  izabranaGodina: number = 4;
  izabraniOdsek: string = "rti";

  godine = [1, 2, 3, 4, 5];
  odseci = ['rti', 'si'];

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
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

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true
  };

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Raspodela obaveza'
    }]
  };

  pieChartLegend = true;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Laboratorijske vežbe',
        data: [],
        backgroundColor: '#468591ff',  
        hoverBackgroundColor: '#087bacff',
        borderColor: '#468591ff'
      },
      {
        label: 'Kolokvijumi',
        data: [],
        backgroundColor: '#97aecfff'
      },
      {
        label: 'Domaći zadaci',
        data: [],
        backgroundColor: '#455c80ff',
        hoverBackgroundColor: '#142f5cff',
        borderColor: '#455c80ff'
      }
    ]
  };
  ngOnInit(): void {
    this.osveziGrafik();
  }

  osveziGrafik(): void {
    if (!this.izabranaGodina || !this.izabraniOdsek) return;

    this.obavezeS.statistikaObavezaPoPredmetima(this.izabranaGodina, this.izabraniOdsek)
      .subscribe(lista => {
        this.barChartData.labels = lista.map(s => s.sifra);
        this.barChartData.datasets[0].data = lista.map(s => s.labovi);
        this.barChartData.datasets[1].data = lista.map(s => s.kolokvijumi);
        this.barChartData.datasets[2].data = lista.map(s => s.domaci);

        this.pieChartData.labels = lista.map(
          s => `${s.sifra}`
        );

        this.pieChartData.datasets[0].data = lista.map(
          s => s.labovi + s.kolokvijumi + s.domaci
        );

        const boje = this.generisiBoje(this.pieChartData.datasets[0].data.length);

        this.pieChartData.datasets[0].backgroundColor = boje.boje;
        this.pieChartData.datasets[0].hoverBackgroundColor = boje.hoverBoje;



        this.charts.forEach(chart => chart.update());
      });
  }

  private generisiBoje(brojPredmeta: number) {
    const boje: string[] = [];
    const hoverBoje: string[] = [];

    for (let i = 0; i < brojPredmeta; i++) {
      const boja = (360 / brojPredmeta) * i;

      boje.push(`hsl(${boja}, 60%, 55%)`);
      hoverBoje.push(`hsl(${boja}, 60%, 40%)`);
    }

    return { boje, hoverBoje };
  }


}
