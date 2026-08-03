import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hardware',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="page-container flex-center fade-in">
      <mat-card class="hardware-card mat-mdc-card glass-panel flex-center flex-column">
        <mat-card-content class="flex-center flex-column">
          <mat-icon class="qr-icon">qr_code_2</mat-icon>
          <h2 class="qr-text">Código QR funcionando correctamente 📱</h2>
          <p class="qr-subtext">El recurso móvil está listo para sincronización con VetCare.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      width: 100%;
      height: 100%;
      min-height: calc(100vh - 120px);
    }
    
    .hardware-card {
      width: 100%;
      max-width: 450px;
      padding: 40px 20px;
      text-align: center;
    }
    
    .qr-icon {
      font-size: 100px;
      width: 100px;
      height: 100px;
      color: var(--primary-color);
      margin-bottom: 24px;
    }
    
    .qr-text {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 12px;
    }
    
    .qr-subtext {
      font-size: 15px;
      color: var(--text-secondary);
      margin: 0;
    }
  `]
})
export class HardwareComponent {}
