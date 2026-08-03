import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../models';

@Component({
  selector: 'app-historial-mascotas',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page-container fade-in">
      <!-- Mensaje si no hay mascotas -->
      <div *ngIf="historial.length === 0" class="empty-state flex-center flex-column">
        <mat-icon class="empty-icon">pets</mat-icon>
        <p class="empty-text">No hay mascotas registradas aún 🐾</p>
      </div>

      <!-- Listado de mascotas -->
      <div *ngIf="historial.length > 0" class="cards-grid">
        <mat-card *ngFor="let mascota of historial" class="pet-card mat-mdc-card">
          <mat-card-content class="flex-align-center">
            <div class="pet-icon-container flex-center">
              <mat-icon class="pet-icon">pets</mat-icon>
            </div>
            <div class="pet-details">
              <h3 class="pet-name">{{ mascota.nombre }}</h3>
              <p class="pet-info"><strong>Especie:</strong> {{ mascota.especie }}</p>
              <p class="pet-info"><strong>Raza:</strong> {{ mascota.raza || 'No especificada' }}</p>
              <p class="pet-info"><strong>Edad:</strong> {{ mascota.edad }} años</p>
              <p class="pet-info"><strong>Propietario:</strong> {{ mascota.nombrePropietario }}</p>
              <p class="pet-info"><strong>ID propietario:</strong> {{ mascota.numeroIdentificacionPropietario }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Botón Flotante para Registrar Nueva Mascota -->
      <button mat-fab color="primary" class="fab-button" routerLink="/registro-mascota" aria-label="Registrar nueva mascota">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .page-container {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      position: relative;
      min-height: calc(100vh - 120px);
      padding-bottom: 80px;
    }
    
    .empty-state {
      height: 300px;
      text-align: center;
      color: #94a3b8;
    }
    
    .empty-icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      margin-bottom: 16px;
    }
    
    .empty-text {
      font-size: 18px;
      font-weight: 500;
    }
    
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 10px;
    }
    
    .pet-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .flex-align-center {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      padding: 16px !important;
    }
    
    .pet-icon-container {
      width: 55px;
      height: 55px;
      background-color: rgba(0, 128, 128, 0.1);
      border-radius: 50%;
      color: var(--primary-color);
    }
    
    .pet-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    .pet-details {
      flex: 1;
    }
    
    .pet-name {
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 6px;
    }
    
    .pet-info {
      font-size: 14px;
      margin: 2px 0;
      color: var(--text-primary);
      opacity: 0.85;
    }
    
    .fab-button {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: var(--primary-color) !important;
      color: #ffffff !important;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
    }
  `]
})
export class HistorialMascotasComponent implements OnInit {
  historial: Mascota[] = [];

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.mascotasService.mascotas$.subscribe((data) => {
      this.historial = data;
    });

    this.mascotasService.getAll().subscribe({
      next: () => {
        this.historial = this.mascotasService.getLocalHistorial();
      },
      error: () => {
        this.historial = this.mascotasService.getLocalHistorial();
      }
    });
  }
}
