import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemonstratoriForma } from '../modeli/demonstratoriForma';
import { Student } from '../modeli/student';
import { PredmetPrijavljeni } from '../modeli/predmetPrijavljeni';

@Injectable({
  providedIn: 'root'
})
export class DemonstratoriService {

  constructor(private http: HttpClient) { }
      
  url = 'http://localhost:8080/demonstratori';

  otvaranjePrijave(formData: FormData){
    return this.http.post<number>(`${this.url}/otvaranjePrijave`, formData);
  }

  aktivnaForma(){
    return this.http.get<DemonstratoriForma>(`${this.url}/aktivnaPrijava`);
  }

  novaPrijava(idStudent: number, idForma: number, predmeti: number[]){
    const data = {
      idStudent: idStudent,
      idForma: idForma,
      predmeti: predmeti
    }
    return this.http.post<number>(`${this.url}/novaPrijava`, data);
  }

  dohvatanjeKonkursa(formaId: number) {
    return this.http.get(`${this.url}/preuzimanjeKonkursa/${formaId}`, {responseType: 'blob'});
  }

  prijavljeniStudentiZaPredmet(idPredmet: number){
    return this.http.get<Student[]>(`${this.url}/prijavljeniZaPredmet/${idPredmet}`);
  }

  prijavljeniStudentiPoPredmetima(){
    return this.http.get<PredmetPrijavljeni[]>(`${this.url}/prijavljeniStudentiPoPredmetima`);
  }

  preuzimanjeSpiskaZaPredmet(idPredemt: number){
    return this.http.get(`${this.url}/spisakPrijavljenih/${idPredemt}`,{ responseType: 'blob' });
  }

  zaduzenZaDemonstratore(idNastavnik: number){
    return this.http.get<boolean>(`${this.url}/zaduzenNastavnik/${idNastavnik}`);
  }
}
