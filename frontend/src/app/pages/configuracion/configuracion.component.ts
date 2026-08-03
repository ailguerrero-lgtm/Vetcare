import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="page-container fade-in">
      <mat-card class="config-card mat-mdc-card">
        <mat-card-header>
          <mat-card-title class="config-title">Ajustes Generales</mat-card-title>
        </mat-card-header>

        <mat-card-content class="flex-column mt-4">
          <!-- Notificaciones Switch -->
          <div class="setting-item flex-row-between">
            <div class="setting-text">
              <div class="label">Activar notificaciones</div>
              <div class="sub-label">Recibir alertas sobre vacunas y citas próximas</div>
            </div>
            <mat-slide-toggle color="primary" [(ngModel)]="notificaciones"></mat-slide-toggle>
          </div>

          <mat-divider class="my-4"></mat-divider>

          <!-- Modo Oscuro Switch -->
          <div class="setting-item flex-row-between">
            <div class="setting-text">
              <div class="label">Modo oscuro</div>
              <div class="sub-label">Cambia el tema visual de la aplicación</div>
            </div>
            <mat-slide-toggle color="primary" [(ngModel)]="modoOscuro" (change)="onThemeChange($event.checked)"></mat-slide-toggle>
          </div>

          <mat-divider class="my-4"></mat-divider>

          <!-- Tamaño de Letra Slider -->
          <div class="setting-item flex-column-start">
            <div class="label mb-2">Tamaño de letra</div>
            <div class="slider-container w-full flex-row-align">
              <span class="font-indicator">12px</span>
              <mat-slider min="12" max="24" step="2" discrete color="primary" class="flex-1">
                <input matSliderThumb [(ngModel)]="tamanoLetra" (valueChange)="onFontSizeChange($event)">
              </mat-slider>
              <span class="font-indicator font-large">24px</span>
            </div>
            <div class="preview-box mt-2" [style.fontSize.px]="tamanoLetra">
              Vista previa del texto ({{ tamanoLetra }} px)
            </div>
          </div>

          <mat-divider class="my-4"></mat-divider>

          <!-- Guardar Cambios -->
          <button mat-raised-button color="primary" class="btn-submit btn-primary w-full mt-2" (click)="guardarCambios()">
            <mat-icon>save</mat-icon>
            <span>Guardar cambios</span>
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .config-card {
      padding: 20px;
    }
    
    .config-title {
      font-size: 22px !important;
      font-weight: 700;
      color: var(--primary-color);
    }
    
    .setting-item {
      padding: 8px 0;
    }
    
    .flex-row-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }
    
    .flex-row-align {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .flex-column-start {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    .setting-text .label {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }
    
    .setting-text .sub-label {
      font-size: 14px;
      color: var(--text-secondary);
      margin-top: 2px;
    }
    
    .slider-container {
      margin: 10px 0;
    }
    
    .font-indicator {
      font-size: 12px;
      color: var(--text-secondary);
    }
    
    .font-large {
      font-size: 18px;
    }
    
    .preview-box {
      width: 100%;
      padding: 16px;
      border: 1px dashed var(--border-color);
      border-radius: 8px;
      text-align: center;
      color: var(--text-primary);
      background-color: rgba(0, 0, 0, 0.02);
    }
    
    .btn-submit {
      height: 48px;
      border-radius: 8px !important;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .my-4 {
      margin: 16px 0;
    }
    
    .flex-1 {
      flex: 1;
    }
  `]
})
export class ConfiguracionComponent implements OnInit {
  notificaciones = true;
  modoOscuro = false;
  tamanoLetra = 16;

  constructor(
    private themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Suscribirse a los valores actuales
    this.themeService.isDarkMode$.subscribe(val => this.modoOscuro = val);
    this.themeService.fontSize$.subscribe(val => this.tamanoLetra = val);
    this.themeService.notificaciones$.subscribe(val => this.notificaciones = val);
  }

  onThemeChange(checked: boolean): void {
    this.themeService.toggleTheme(checked);
    const message = checked ? 'Modo oscuro activado 🌙' : 'Modo claro activado ☀️';
    this.snackBar.open(message, 'Cerrar', { duration: 2000 });
  }

  onFontSizeChange(size: number): void {
    this.themeService.setFontSize(size);
  }

  guardarCambios(): void {
    this.themeService.setNotificaciones(this.notificaciones);
    this.themeService.guardarConfiguracion();
    this.snackBar.open('Configuración guardada exitosamente ✅', 'Cerrar', { duration: 3000 });
  }
}
