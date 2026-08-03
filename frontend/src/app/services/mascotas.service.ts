import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Mascota } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private apiUrl = 'http://localhost:3000/api/mascotas';

  // Replicamos el historial local que existía en registro_mascota.dart
  private localHistorial: Mascota[] = [];
  private mascotasSubject = new BehaviorSubject<Mascota[]>([]);
  mascotas$ = this.mascotasSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl).pipe(
      tap((data) => {
        this.localHistorial = [...data];
        this.mascotasSubject.next([...data]);
      })
    );
  }

  getById(id: string): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`);
  }

  create(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.apiUrl, mascota).pipe(
      tap((nueva) => {
        const actual = this.mascotasSubject.value;
        const nuevaLista = [nueva, ...actual];
        this.localHistorial = nuevaLista;
        this.mascotasSubject.next(nuevaLista);
      })
    );
  }

  update(id: string, mascota: Partial<Mascota>): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.apiUrl}/${id}`, mascota).pipe(
      tap((actualizada) => {
        const actual = this.mascotasSubject.value;
        const nuevaLista = actual.map((item) => item.id === id ? { ...item, ...actualizada } : item);
        this.localHistorial = nuevaLista;
        this.mascotasSubject.next(nuevaLista);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const actual = this.mascotasSubject.value;
        const nuevaLista = actual.filter((item) => item.id !== id);
        this.localHistorial = nuevaLista;
        this.mascotasSubject.next(nuevaLista);
      })
    );
  }

  // Métodos para acceder al historial local (de sesión)
  getLocalHistorial(): Mascota[] {
    return [...this.localHistorial];
  }
}
