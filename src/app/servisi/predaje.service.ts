import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predaja } from '../modeli/predaja';

@Injectable({
  providedIn: 'root'
})
export class PredajeService {

  constructor(private http: HttpClient) { }
      
  url = 'http://localhost:8080/predaje';

  predajDomaci(formData: FormData) {
    return this.http.post<number>(`${this.url}/nova`, formData);
  }

  predatiDomaci(studentId: number){
    return this.http.get<Predaja[]>(`${this.url}/zaStudenta/${studentId}`);
  }

  preuzimanjeDomaceg(idObaveze: number, student: string){
    return this.http.get(`${this.url}/preuzimanje/${idObaveze}/${student}`,{ responseType: 'blob' });
  }

  preuzimanjeSvihRadova(idObaveze: number){
    return this.http.get(`${this.url}/preuzmiSve/${idObaveze}`, { responseType: 'blob' });
  }

  brojPredatihRadova(idObaveza: number){
    return this.http.get<number>(`${this.url}/brojRadova/${idObaveza}`);
  }

}
