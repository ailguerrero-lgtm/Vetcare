import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  private fontSizeSubject = new BehaviorSubject<number>(16);
  fontSize$ = this.fontSizeSubject.asObservable();

  private notificacionesSubject = new BehaviorSubject<boolean>(true);
  notificaciones$ = this.notificacionesSubject.asObservable();

  constructor() {
    this.cargarConfiguracion();
  }

  toggleTheme(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark);
    this.aplicarTema(isDark);
    localStorage.setItem('vetcare_dark_mode', JSON.stringify(isDark));
  }

  setFontSize(size: number): void {
    this.fontSizeSubject.next(size);
    this.aplicarFontSize(size);
    localStorage.setItem('vetcare_font_size', JSON.stringify(size));
  }

  setNotificaciones(status: boolean): void {
    this.notificacionesSubject.next(status);
    localStorage.setItem('vetcare_notificaciones', JSON.stringify(status));
  }

  guardarConfiguracion(): void {
    localStorage.setItem('vetcare_dark_mode', JSON.stringify(this.isDarkModeSubject.value));
    localStorage.setItem('vetcare_font_size', JSON.stringify(this.fontSizeSubject.value));
    localStorage.setItem('vetcare_notificaciones', JSON.stringify(this.notificacionesSubject.value));
  }

  private cargarConfiguracion(): void {
    const savedDark = localStorage.getItem('vetcare_dark_mode');
    const savedSize = localStorage.getItem('vetcare_font_size');
    const savedNotif = localStorage.getItem('vetcare_notificaciones');

    if (savedDark !== null) {
      const isDark = JSON.parse(savedDark);
      this.isDarkModeSubject.next(isDark);
      this.aplicarTema(isDark);
    }

    if (savedSize !== null) {
      const size = JSON.parse(savedSize);
      this.fontSizeSubject.next(size);
      this.aplicarFontSize(size);
    } else {
      this.aplicarFontSize(16);
    }

    if (savedNotif !== null) {
      this.notificacionesSubject.next(JSON.parse(savedNotif));
    }
  }

  private aplicarTema(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  private aplicarFontSize(size: number): void {
    document.documentElement.style.setProperty('--app-font-size', `${size}px`);
  }
}
