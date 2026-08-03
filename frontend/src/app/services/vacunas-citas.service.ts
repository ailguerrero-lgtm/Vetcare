import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VacunaCita } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VacunasCitasService {
  private apiUrl = 'http://localhost:3000/api/vacunas-citas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<VacunaCita[]> {
    return this.http.get<VacunaCita[]>(this.apiUrl);
  }

  getById(id: string): Observable<VacunaCita> {
    return this.http.get<VacunaCita>(`${this.apiUrl}/${id}`);
  }

  create(registro: VacunaCita): Observable<VacunaCita> {
    return this.http.post<VacunaCita>(this.apiUrl, registro);
  }

  update(id: string, registro: Partial<VacunaCita>): Observable<VacunaCita> {
    return this.http.put<VacunaCita>(`${this.apiUrl}/${id}`, registro);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
