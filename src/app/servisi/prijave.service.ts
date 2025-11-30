import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../modeli/student';
import { Obaveza } from '../modeli/obaveza';

@Injectable({
  providedIn: 'root'
})
export class PrijaveService {

  constructor(private http: HttpClient) { }
    
  url = 'http://localhost:8080/prijave';

  novaPrijava(idStudent: number, idObaveza: number){
    return this.http.post<number>(`${this.url}/nova/${idStudent}/${idObaveza}`, null);
  }

  proveriPrijavu(idStudent: number, idObaveza: number) {
    return this.http.get<number>(`${this.url}/provera/${idStudent}/${idObaveza}`);
  }

  svePrijaveZaObavezu(idObaveza: number){
    return this.http.get<Student[]>(`${this.url}/svePrijaveZaObavezu/${idObaveza}`);
  }

  preuzimanjeSpiska(id: number) {
    return this.http.get(`${this.url}/preuzimanjeSpiska/${id}`,{ responseType: 'blob' });
  }

  prijaveZaKolokvijume(idStudent: number){
    return this.http.get<Obaveza[]>(`${this.url}/prijaveZaKolokvijum/student/${idStudent}`);
  }

  prijaveZaIspit(idStudent: number){
    return this.http.get<Obaveza[]>(`${this.url}/prijaveZaIspit/student/${idStudent}`);
  }

  prijaveZaLabove(idStudent: number){
    return this.http.get<Obaveza[]>(`${this.url}/prijaveZaLab/student/${idStudent}`);
  }

  prijaveZaOdbrane(idStudent: number){
    return this.http.get<Obaveza[]>(`${this.url}/prijaveZaOdbrane/student/${idStudent}`);
  }

  brojPrijavljenih(idObaveza: number){
    return this.http.get<number>(`${this.url}/brojPrijava/${idObaveza}`);
  }

  odjava(idStudent: number, idObaveza: number){
    return this.http.delete<number>(`${this.url}/odjava/${idStudent}/${idObaveza}`);
  }
}
