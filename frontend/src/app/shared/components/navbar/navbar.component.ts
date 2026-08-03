import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar class="navbar-toolbar">
      <button mat-icon-button (click)="onMenuToggle()" aria-label="Toggle menu">
        <mat-icon>menu</mat-icon>
      </button>
      
      <span class="navbar-title">{{ title }}</span>
      
      <span class="spacer"></span>
      
      <button mat-icon-button (click)="irAConfiguracion()" aria-label="Configuración">
        <mat-icon>settings</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .navbar-toolbar {
      background: linear-gradient(135deg, #0f3d72 0%, #18b8a3 100%) !important;
      color: #ffffff !important;
      box-shadow: 0 8px 20px rgba(15, 61, 114, 0.22);
      transition: background-color 0.3s ease;
      padding: 0 16px;
    }
    
    .navbar-title {
      font-weight: 600;
      font-size: 18px;
      margin-left: 8px;
      letter-spacing: 0.3px;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    button {
      color: #ffffff !important;
    }
  `]
})
export class NavbarComponent {
  @Input() title: string = 'VetCare';
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}

  onMenuToggle(): void {
    this.toggleSidebar.emit();
  }

  irAConfiguracion(): void {
    this.router.navigate(['/configuracion']);
  }
}
