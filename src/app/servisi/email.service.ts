import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
        
  url = 'http://localhost:8080/email';

  slanjeMejlaOUspesnostiPrijave(idStudent: number, idObaveza: number){
    return this.http.get<number>(`${this.url}/uspesnaPrijava/${idStudent}/${idObaveza}`);
  }

  slanjeMejlaOUspesnostiPredaje(idStudent: number, idObaveza: number){
    return this.http.get<number>(`${this.url}/uspesnaPredaja/${idStudent}/${idObaveza}`);
  }

  otvorenaObaveza(idObaveza: number){
    return this.http.get<number>(`${this.url}/otvorenaObaveza/${idObaveza}`);
  }

  otvorenaPrijavaZaDemonstratore(){
    return this.http.get<number>(`${this.url}/otvorenaPrijavaZaDemonstratore`);
  }

  uspesnaPrijavaZaDemonstratore(idStudent: number){
    return this.http.get<number>(`${this.url}/uspesnaPrijavaZaDemonstratora/${idStudent}`);
  }
}
