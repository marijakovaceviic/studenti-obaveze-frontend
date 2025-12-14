import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { RezervacijeService } from '../servisi/rezervacije.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pregled-rezervacija-lab',
  templateUrl: './pregled-rezervacija-lab.component.html',
  styleUrls: ['./pregled-rezervacija-lab.component.css']
})
export class PregledRezervacijaLabComponent {

  plugins = [resourceTimelinePlugin, interactionPlugin];
  @ViewChild('kalendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: this.plugins,
    initialView: 'resourceTimelineDay',
    initialDate: this.datumUString(this.dohvatanjePonedeljka(new Date())),
    slotMinTime: '08:00:00',
    slotMaxTime: '23:00:00',
    slotDuration: '01:00',
    slotLabelInterval: '01:00',
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    resourceAreaHeaderContent: 'Dani',
    resources: [
      { id: '1', title: 'pon' },
      { id: '2', title: 'uto' },
      { id: '3', title: 'sre' },
      { id: '4', title: 'cet' },
      { id: '5', title: 'pet' },
      { id: '6', title: 'seb' },
      { id: '7', title: 'ned' }
    ],
    events: [],
    headerToolbar: false,
    height: 'auto',
    eventDidMount: (info) => {
      const tooltipText = info.event.extendedProps['tooltip'];
      if (tooltipText) {
        info.el.setAttribute('title', tooltipText);
      }
    }
  };

  constructor(private rezervacijeS: RezervacijeService, private route: ActivatedRoute) { }

  pocetakIzabraneNedelje: Date = this.dohvatanjePonedeljka(new Date());
  @Input() idLab!: number;
  prikazNedelje: string = "";

  dohvatanjePonedeljka(d: Date): Date {
    const prosledjeniDatum = new Date(d);
    const dan = prosledjeniDatum.getDay();
    const ponedeljak = prosledjeniDatum.getDate() - dan + (dan === 0 ? -6 : 1);
    return new Date(prosledjeniDatum.setDate(ponedeljak));
  }

  datumUString(d: Date): string {
    const mesec = (d.getMonth() + 1).toString().padStart(2, '0');
    const dan = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${mesec}-${dan}`;
  }

  ngOnInit(): void {
    this.ucitavanjeRezervacija();
    this.osvezavanjePrikazaNedelje();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idLab'] && !changes['idLab'].isFirstChange()) {
      this.ucitavanjeRezervacija();
    }
  }

  ucitavanjeRezervacija(){
    const pocetak = this.datumUString(this.pocetakIzabraneNedelje);
    const krajDatum = new Date(this.pocetakIzabraneNedelje);
    krajDatum.setDate(krajDatum.getDate() + 6);
    const kraj = this.datumUString(krajDatum);
    this.rezervacijeS.nedeljneRezervacije(pocetak, kraj, this.idLab).subscribe(
      rezervacije => {
          const events = rezervacije.map(r => {
          const start = `${pocetak}T${r.vremeOd}`; 
          const end = `${pocetak}T${r.vremeDo}`;   
          const datum = new Date(r.datum);
          const danUNedelji = datum.getDay();
          const resourceId = danUNedelji === 0 ? '7' : danUNedelji.toString(); 

          const vremeOd = r.vremeOd.substring(0,5); 
          const vremeDo = r.vremeDo.substring(0,5);
          return {
            resourceId: resourceId,
            title: `${vremeOd}-${vremeDo} ${r.akronim}`,
            start: start,
            end: end,
            extendedProps: {
              tooltip: `${r.nazivObaveze} (${r.imeNastavnika} ${r.prezimeNastavnika})`
            }
          };
        });
        this.calendarOptions = {
          ...this.calendarOptions,
          resources: this.generisanjeResursaZaNedelju(this.pocetakIzabraneNedelje),
          events: events
        };
        setTimeout(() => {
        this.calendarComponent.getApi().gotoDate(pocetak);
      });
    })
  }
  sledecaNedelja() {
    this.pocetakIzabraneNedelje.setDate(this.pocetakIzabraneNedelje.getDate() + 7);
    this.ucitavanjeRezervacija();
    this.osvezavanjePrikazaNedelje();
  }

  prethodnaNedelja() {
    this.pocetakIzabraneNedelje.setDate(this.pocetakIzabraneNedelje.getDate() - 7);
    this.ucitavanjeRezervacija();
    this.osvezavanjePrikazaNedelje();
  }

  generisanjeResursaZaNedelju(pocetak: Date) {
    const resursi = [];
    for (let i = 0; i < 7; i++) {
      const datum = new Date(pocetak);
      datum.setDate(pocetak.getDate() + i);

      const danUNedelji = datum.getDay(); 
      const danNaziv = ['ned', 'pon', 'uto', 'sre', 'cet', 'pet', 'sub'][danUNedelji];

      const danBroj = datum.getDate();
      resursi.push({
        id: (danUNedelji === 0 ? 7 : danUNedelji).toString(), 
        title: `${danBroj}.(${danNaziv})`
      });
    } 
    return resursi;
  }

  osvezavanjePrikazaNedelje() {
    const pocetak = this.pocetakIzabraneNedelje;

    const kraj = new Date(pocetak);
    kraj.setDate(kraj.getDate() + 6);

    const p = this.datumPrikaz(pocetak);
    const k = this.datumPrikaz(kraj);

    this.prikazNedelje = `${p} - ${k}`;
  }

  datumPrikaz(d: Date): string {
    const mesec = (d.getMonth() + 1).toString().padStart(2, '0');
    const dan = d.getDate().toString().padStart(2, '0');
    return `${dan}.${mesec}.${d.getFullYear()}.`;
  }

}
