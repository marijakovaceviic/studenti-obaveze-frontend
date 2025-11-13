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
}
