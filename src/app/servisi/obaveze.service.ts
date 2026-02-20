import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obaveza } from '../modeli/obaveza';
import { StatistikaObaveza } from '../modeli/statistikaObaveza';

@Injectable({
  providedIn: 'root'
})
export class ObavezeService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/obaveze';

  dodavanjeObaveze(tip: string, predmet: number, naziv: string, opis: string, pocetak: string, kraj: string){
    const nazivZaSlanje = naziv == "" ? null : naziv;
    const opisZaSlanje = opis == "" ? null : opis;

    const obaveza = {
      tip: tip,
      predmet: predmet,
      naziv: nazivZaSlanje,
      opis: opisZaSlanje,
      pocetak: pocetak,
      kraj: kraj
    }
    return this.http.post<number>(`${this.url}/dodavanje`, obaveza);
  }

  dohvatanjeSvihObaveza(){
    return this.http.get<Obaveza[]>(`${this.url}/sveObaveze`);
  }

  dohvatanjeObavezaZaPredmet(idPredmeta: number){
    return this.http.get<Obaveza[]>(`${this.url}/zaPredmet/${idPredmeta}`);
  }

  dohvatanjeObavezaZaStudenta(idStudent: number){
    return this.http.get<Obaveza[]>(`${this.url}/zaStudenta/${idStudent}`);
  }

  dohvatanjeObavezaZaNastavnika(idNastavnik: number){
    return this.http.get<Obaveza[]>(`${this.url}/zaNastavnika/${idNastavnik}`);
  }

  dohvatanjeObavezePoIdu(idObaveze: number){
    return this.http.get<Obaveza>(`${this.url}/dohvatanjePoId/${idObaveze}`);
  }

  dohvatanjeIsteklihObavezaZaPredmet(idPredmet: number){
    return this.http.get<Obaveza[]>(`${this.url}/istekle/zaPredmet/${idPredmet}`);
  }

  brojAktivnihObavezaZaPredmet(idPredmet: number){
    return this.http.get<number>(`${this.url}/brojAktivnih/zaPredmet/${idPredmet}`);
  }

  brojIsteklihObavezaZaPredmet(idPredmet: number){
    return this.http.get<number>(`${this.url}/brojIsteklih/zaPredmet/${idPredmet}`);
  }

  statistikaObavezaPoPredmetima(godina: number, odsek: string){
    return this.http.get<StatistikaObaveza[]>(`${this.url}/statistika/${godina}/${odsek}`);
  }

  dohvatanjeNovootvorenihObavezaZaPredmet(idPredmeta: number){
    return this.http.get<Obaveza[]>(`${this.url}/nove/zaPredmet/${idPredmeta}`);
  }

  azuriranjeObaveze(id: number, naziv: string, opis: string, tip: string, 
                  pocetak: string, kraj: string, predmet: number){
    const data = {
      id: id,
      naziv: naziv,
      opis: opis,
      tip: tip,
      pocetak: pocetak,
      kraj: kraj,
      predmet: predmet
    };
    return this.http.post<number>(`${this.url}/azuriranje`, data);
  }

  brojNovihNeaktivnihObavezaNaPredmetu(idPredmet: number){
    return this.http.get<number>(`${this.url}/brojNovihNeaktivnih/zaPredmet/${idPredmet}`);
  }
}
