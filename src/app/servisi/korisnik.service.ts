import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../modeli/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/korisnici';

  prijava(korisnickoIme: string, lozinka: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    };
    return this.http.post<Korisnik>(`${this.url}/prijava`, data);
  }
}
