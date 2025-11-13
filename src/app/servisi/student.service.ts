import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../modeli/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/studenti';


  proveraStudenta(email: string){
    return this.http.post<number>(`${this.url}/provera`, email);
  }

  registracija(email: string, lozinka: string){
    const data = {
      email : email,
      lozinka: lozinka
    }
    return this.http.post<number>(`${this.url}/registracija`, data)
  }

  prijava(email: string, lozinka: string){
    const data = {
      email : email,
      lozinka: lozinka
    }
    return this.http.post<Student>(`${this.url}/prijava`, data);
  }

  promenaLozinke(email: string, novaLozinka: string){
    const data = {
      email: email,
      lozinka: novaLozinka
    }
    return this.http.post<number>(`${this.url}/promenaLozinke`, data)
  }
}
