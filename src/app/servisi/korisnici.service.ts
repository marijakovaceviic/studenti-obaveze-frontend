import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  constructor(private http: HttpClient) { }
    
  private url = 'http://localhost:8080/korisnici';
  
  zaboravljenaLozinka(email: string, uloga: string) {
    const data = {
      email: email,
      uloga: uloga
    }
    return this.http.post<number>(`${this.url}/zaboravljenaLozinka`, data);
  }
}
