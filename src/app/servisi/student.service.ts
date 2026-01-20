import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../modeli/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/studenti';
  urlLdap = 'http://localhost:8080/ldap';

  proveraStudenta(email: string){
    return this.http.post<number>(`${this.url}/provera`, email);
  }

  registracija(id: number, email: string, lozinka: string){
    const data = {
      id: id,
      email: email,
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

  prijavaLdap(korisnickoIme: string, lozinka: string){
    const data = {
      korisnickoIme : korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post<Student>(`${this.urlLdap}/prijavaStudent`, data);
  }

  promenaLozinke(email: string, staraLozinka: string, novaLozinka: string){
    const data = {
      email: email,
      lozinka: staraLozinka,
      novaLozinka: novaLozinka
    }
    return this.http.post<number>(`${this.url}/promenaLozinke`, data)
  }
}
