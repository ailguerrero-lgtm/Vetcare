import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario, AuthResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.cargarUsuarioGuardado();
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        this.guardarSesion(res.usuario, res.token);
      })
    );
  }

  register(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { nombre, email, password });
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recover`, { email });
  }

  logout(): void {
    localStorage.removeItem('vetcare_user');
    localStorage.removeItem('vetcare_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('vetcare_token');
  }

  private guardarSesion(usuario: Usuario, token: string): void {
    localStorage.setItem('vetcare_user', JSON.stringify(usuario));
    localStorage.setItem('vetcare_token', token);
    this.currentUserSubject.next(usuario);
  }

  private cargarUsuarioGuardado(): void {
    const savedUser = localStorage.getItem('vetcare_user');
    const token = localStorage.getItem('vetcare_token');
    if (savedUser && token) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }
}
