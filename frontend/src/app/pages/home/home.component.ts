import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="home-container">
      <div class="content-row">
        <!-- Sección de Texto Explicativo (Izquierda en desktop, arriba en móvil) -->
        <div class="text-section flex-column">
          <h1 class="welcome-heading">¿Por qué utilizar VetCare?</h1>
          
          <p class="description-text">
            VetCare proporciona una plataforma moderna y confiable para la gestión
            de mascotas, permitiendo almacenar información médica, registros de
            vacunas, citas y datos del propietario. Ofrecemos una experiencia fácil,
            rápida y segura para que siempre tengas el control del bienestar de tus
            mascotas.
          </p>
          
          <p class="description-text">
            VetCare está diseñado para clínicas veterinarias y usuarios que desean
            organizar y cuidar mejor a sus animales, asegurando que toda la información
            esté disponible cuando más la necesites.
          </p>
        </div>

        <!-- Tarjeta de Bienvenida (Derecha en desktop, abajo en móvil) -->
        <div class="card-section flex-center">
          <mat-card class="welcome-card mat-mdc-card">
            <mat-card-content class="flex-center flex-column">
              <img src="/images/VetCare.png" alt="VetCare" class="welcome-logo" />
              <h2 class="welcome-title">Bienvenidos a VetCare</h2>
              <p class="welcome-subtitle">Más que una app, una familia 🐾</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .content-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1100px;
      gap: 40px;
      padding: 20px;
    }
    
    .text-section {
      flex: 1;
      max-width: 600px;
    }
    
    .welcome-heading {
      font-size: 36px;
      font-weight: 800;
      color: #0f3d72;
      margin-bottom: 20px;
      line-height: 1.2;
    }
    
    .description-text {
      font-size: 18px;
      line-height: 1.6;
      color: var(--text-primary);
      opacity: 0.9;
      margin-bottom: 16px;
    }
    
    .card-section {
      flex: 1;
      justify-content: center;
    }
    
    .welcome-card {
      width: 380px;
      padding: 30px;
      border-radius: 25px !important;
      text-align: center;
      background: var(--card-bg) !important;
      transition: all 0.3s ease;
    }
    
    .welcome-logo {
      width: 180px;
      margin-bottom: 20px;
      object-fit: contain;
    }
    
    .welcome-title {
      font-size: 24px;
      font-weight: 700;
      color: #0f3d72;
      margin-bottom: 10px;
    }
    
    .welcome-subtitle {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0;
    }
    
    /* Layout Adaptativo (Responsive) */
    @media (max-width: 800px) {
      .content-row {
        flex-direction: column;
        gap: 30px;
        text-align: center;
      }
      
      .welcome-heading {
        font-size: 28px;
      }
      
      .description-text {
        font-size: 16px;
      }
      
      .welcome-card {
        width: 100%;
        max-width: 380px;
      }
    }
  `]
})
export class HomeComponent {}
