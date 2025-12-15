import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nastavnik } from '../modeli/nastavnik';

@Injectable({
  providedIn: 'root'
})
export class NastavniciService {

  constructor(private http: HttpClient) { }
    
  url = 'http://localhost:8080/nastavnici';

  registracija(ime: string, prezime: string, email: string){
    const data = {
      ime: ime,
      prezime: prezime,
      email: email
    }
    return this.http.post<number>(`${this.url}/registracija`, data);
  }

  prijava(email: string, lozinka: string){
    const data = {
      email : email,
      lozinka: lozinka
    }
    return this.http.post<Nastavnik>(`${this.url}/prijava`, data);
  }

  promenaLozinke(email: string, lozinka: string, novaLozinka: string){
    const data = {
      email: email,
      lozinka: lozinka,
      novaLozinka: novaLozinka
    }
    return this.http.post<number>(`${this.url}/promenaLozinke`, data);
  }

  dohvatanjeSvihNastavnika(){
    return this.http.get<Nastavnik[]>(`${this.url}/sviNastavnici`);
  }
  
  dohvatanjeNastavnikaNaPredmetu(id: number){
    return this.http.get<Nastavnik[]>(`${this.url}/nastavniciNaPredmetu/${id}`);
  }

  dodavanjeNastavnikaNaPredemt(idNastavnik: number, idPredmet: number){
    return this.http.post<number>(`${this.url}/dodavanjeNastavnikaNaPredmet/${idNastavnik}/${idPredmet}`, null);
  }

  brisanjeNastavnikaSaPredemta(idNastavnik: number, idPredmet: number){
    return this.http.delete<number>(`${this.url}/brisanjeNastavnikaSaPredmeta/${idNastavnik}/${idPredmet}`);
  }

  postaviZaduzenog(idNastavnik: number){
    return this.http.post<number>(`${this.url}/postaviZaduzenog/${idNastavnik}`, null);
  }

  ukloniZaduzenog(idNastavnik: number) {
    return this.http.post<number>(`${this.url}/ukloniZaduzenog/${idNastavnik}`, null);
  }

  zaduzenZaDemonstratore(){
    return this.http.get<Nastavnik>(`${this.url}/zaduzenZaDemonstratore`);
  }
}
