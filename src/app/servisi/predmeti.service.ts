import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predmet } from '../modeli/predmet';

@Injectable({
  providedIn: 'root'
})
export class PredmetiService {

  constructor(private http: HttpClient) { }
  
  url = 'http://localhost:8080/predmeti';

  dodavanjePredmeta(naziv:string, sifra:string, godina:number, odsek:string){
    const data = {
      naziv: naziv,
      sifra: sifra,
      godina: godina,
      odsek: odsek
    }
    return this.http.post<number>(`${this.url}/dodavanje`, data);
  }

  dohvatanjeSvihPredmeta(){
    return this.http.get<Predmet[]>(`${this.url}/sviPredmeti`);
  }

  cuvanjeIzabranihPredmeta(izabrani: number[], studentId: number){
    const data = {
      izabraniPredmeti: izabrani,
      studentId: studentId
    }
    return this.http.post<number>(`${this.url}/izborPredmeta`, data);
  }

  dohvatanjeIzabranihPredmeta(id: number){
    return this.http.get<Predmet[]>(`${this.url}/predmetiZaStudenta/${id}`);
  }

  dohvatanjePredmetaZaNastavnika(id: number){
    return this.http.get<Predmet[]>(`${this.url}/predmetiZaNastavnika/${id}`);
  }

  dohvatanjeGodinaKojeStudentPrati(idStudent: number) {
    return this.http.get<number[]>(`${this.url}/godine/${idStudent}`);
  }

  dohvatanjePredmetaSaAktivnimObavezama(idStudent: number, godina: number) {
    return this.http.get<Predmet[]>(`${this.url}/predmetiSaAktivnimObavezama/${idStudent}/${godina}`);
  }

  dohvatanjePredmetaSaAktivnimObavezamaZaGodinu(godina: number) {
    return this.http.get<Predmet[]>(`${this.url}/aktivneObavezeZaGodinu/${godina}`);
  }

}
