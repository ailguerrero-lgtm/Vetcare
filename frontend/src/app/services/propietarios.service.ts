import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propietario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PropietariosService {
  private apiUrl = 'http://localhost:3000/api/propietarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(this.apiUrl);
  }

  getById(id: string): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.apiUrl}/${id}`);
  }

  create(propietario: Propietario): Observable<Propietario> {
    return this.http.post<Propietario>(this.apiUrl, propietario);
  }

  update(id: string, propietario: Partial<Propietario>): Observable<Propietario> {
    return this.http.put<Propietario>(`${this.apiUrl}/${id}`, propietario);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
