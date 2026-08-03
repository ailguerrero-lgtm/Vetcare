import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-page-two',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="page-container flex-center fade-in">
      <mat-card class="content-card mat-mdc-card">
        <mat-card-content class="flex-center">
          <h2 class="welcome-text">¡Bienvenido a la Página Dos!</h2>
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
    .content-card {
      width: 100%;
      max-width: 500px;
      padding: 40px 20px;
      border-top: 5px solid #7c3aed !important; /* Púrpura */
      text-align: center;
    }
    .welcome-text {
      font-size: 24px;
      font-weight: 700;
      color: #7c3aed;
      margin: 0;
    }
  `]
})
export class PageTwoComponent {}
