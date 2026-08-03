import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatDividerModule],
  template: `
    <div class="sidebar-container flex-column h-full">
      <div class="sidebar-header flex-center flex-column">
        <img src="/images/VetCare.png" alt="VetCare" class="logo" />
        <h2 class="title">VetCare</h2>
      </div>

      <mat-nav-list class="menu-list flex-1">
        <a mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          <mat-icon matListItemIcon>home</mat-icon>
          <span matListItemTitle>Inicio</span>
        </a>
        
        <mat-divider></mat-divider>
        
        <a mat-list-item routerLink="/registro-mascota" routerLinkActive="active">
          <mat-icon matListItemIcon>add_circle</mat-icon>
          <span matListItemTitle>Registrar Mascota</span>
        </a>
        
        <a mat-list-item routerLink="/lista-mascotas" routerLinkActive="active">
          <mat-icon matListItemIcon>list</mat-icon>
          <span matListItemTitle>Lista de Mascotas</span>
        </a>
        
        <a mat-list-item routerLink="/vacunas-citas" routerLinkActive="active">
          <mat-icon matListItemIcon>vaccines</mat-icon>
          <span matListItemTitle>Vacunas y Citas</span>
        </a>
        
        <a mat-list-item routerLink="/propietarios" routerLinkActive="active">
          <mat-icon matListItemIcon>people</mat-icon>
          <span matListItemTitle>Propietarios</span>
        </a>
        
        <a mat-list-item routerLink="/configuracion" routerLinkActive="active">
          <mat-icon matListItemIcon>settings</mat-icon>
          <span matListItemTitle>Configuración</span>
        </a>
        
        <mat-divider></mat-divider>
        
        <a mat-list-item routerLink="/hardware" routerLinkActive="active">
          <mat-icon matListItemIcon>qr_code</mat-icon>
          <span matListItemTitle>Recursos del QR Móvil</span>
        </a>
        
        <mat-divider></mat-divider>
        
        <button mat-list-item (click)="logout()" class="logout-btn">
          <mat-icon matListItemIcon class="text-danger">logout</mat-icon>
          <span matListItemTitle class="text-danger">Cerrar sesión</span>
        </button>
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .sidebar-container {
      width: 280px;
      height: 100%;
      background: #ffffff;
      color: var(--sidebar-text);
      transition: background-color 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .sidebar-header {
      padding: 30px 16px;
      background: linear-gradient(135deg, #0f3d72 0%, #18b8a3 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      text-align: center;
    }
    
    .logo {
      width: 90px;
      height: 90px;
      object-fit: contain;
      margin-bottom: 12px;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
    }
    
    .title {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: 0.5px;
    }
    
    .menu-list {
      padding-top: 10px;
      background: #ffffff;
    }
    
    a mat-list-item, button mat-list-item {
      color: #1e293b !important;
      height: 48px;
      margin: 4px 8px;
      border-radius: 8px;
      transition: all 0.2s ease !important;
    }
    
    a mat-list-item:hover, button mat-list-item:hover {
      background-color: rgba(15, 61, 114, 0.06) !important;
      color: #0f3d72 !important;
    }
    
    .active {
      background: linear-gradient(135deg, #18b8a3 0%, #0f3d72 100%) !important;
      color: #ffffff !important;
      box-shadow: 0 8px 18px rgba(15, 61, 114, 0.22);
    }
    
    mat-divider {
      border-top-color: rgba(255, 255, 255, 0.08) !important;
      margin: 10px 0;
    }
    
    .logout-btn {
      width: calc(100% - 16px);
      text-align: left;
      background: transparent;
      border: none;
      cursor: pointer;
    }
    
    .text-danger {
      color: #f87171 !important;
    }
    
    .flex-1 {
      flex: 1;
    }
  `]
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
