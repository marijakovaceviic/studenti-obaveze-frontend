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

}
