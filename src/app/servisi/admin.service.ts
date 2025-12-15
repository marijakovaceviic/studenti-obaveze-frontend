import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../modeli/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  
  private url = 'http://localhost:8080/admin';

  prijava(email: string, lozinka: string){
    const data = {
      email : email,
      lozinka: lozinka
    }
    return this.http.post<Admin>(`${this.url}/prijava`, data);
  }
}
