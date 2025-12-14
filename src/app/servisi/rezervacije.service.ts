import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Laboratorija } from '../modeli/laboratorija';
import { Rezervacija } from '../modeli/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  constructor(private http: HttpClient) { }
     
   url = 'http://localhost:8080/rezervacije';

   novaRezervacija(idLaboratorija: number, nazivObaveze: string, idNastavnik: number, datum: string, vremeOd: string, 
    vremeDo: string, akronim: string){
    const rezervacija = {
      idLaboratorija: idLaboratorija,
      nazivObaveze: nazivObaveze,
      idNastavnik: idNastavnik,
      datum: datum,
      vremeOd: vremeOd,
      vremeDo: vremeDo,
      akronim: akronim
    }
    return this.http.post<number>(`${this.url}/nova`, rezervacija);
  }

  slobodneLaboratorije(datum: string, vremeOd: string, vremeDo: string){
    const rezervacija = {
      datum: datum,
      vremeOd: vremeOd,
      vremeDo: vremeDo
    }
    return this.http.post<Laboratorija[]>(`${this.url}/slobodneLaboratorije`, rezervacija);
  }

  nedeljneRezervacije(pocetak: string, kraj: string, idLaboratorije: number){
    const period = {
      idLaboratorija: idLaboratorije,
      pocetak: pocetak,
      kraj: kraj
    }
    return this.http.post<Rezervacija[]>(`${this.url}/nedeljneRezervacije`, period);
  }

  sveLaboratorije(){
    return this.http.get<Laboratorija[]>(`${this.url}/sveLaboratorije`);
  }
}
