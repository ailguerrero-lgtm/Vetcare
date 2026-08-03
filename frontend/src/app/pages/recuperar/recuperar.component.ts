import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="recover-wrapper flex-center min-h-screen">
      <mat-card class="recover-card glass-panel fade-in">
        <mat-card-header>
          <mat-card-title class="recover-title">Recuperar acceso 🐶</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="recoverForm" (ngSubmit)="onSubmit()" class="flex-column mt-4">
            <mat-form-field appearance="outline" class="mb-4">
              <mat-label>Correo electrónico o usuario</mat-label>
              <input matInput type="email" formControlName="email" placeholder="ejemplo@correo.com">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="recoverForm.get('email')?.hasError('required')">El correo es requerido</mat-error>
              <mat-error *ngIf="recoverForm.get('email')?.hasError('email')">Ingresa un correo válido</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" class="btn-submit btn-primary" type="submit" [disabled]="loading">
              <span>Recuperar Contraseña</span>
            </button>
          </form>

          <div class="actions-row mt-4 flex-center">
            <a mat-button routerLink="/login">Volver al Inicio de Sesión</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .recover-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
    }
    
    .recover-card {
      width: 400px;
      padding: 24px;
    }
    
    .recover-title {
      color: var(--primary-color) !important;
      font-size: 22px !important;
      font-weight: 700;
      text-align: center;
      width: 100%;
    }
    
    .btn-submit {
      height: 48px;
      border-radius: 8px !important;
      font-size: 16px;
      font-weight: 600;
      margin-top: 10px;
    }
    
    .actions-row a {
      color: var(--primary-color) !important;
    }
    
    .min-h-screen {
      min-height: 100vh;
    }
  `]
})
export class RecuperarComponent implements OnInit {
  recoverForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.recoverForm.invalid) return;

    this.loading = true;
    const { email } = this.recoverForm.value;

    this.authService.recoverPassword(email).subscribe({
      next: (res) => {
        this.snackBar.open(res.message || 'Se ha enviado un enlace para recuperar tu contraseña 📩', 'Cerrar', {
          duration: 4000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        let message = 'Error al enviar el correo ❌';
        
        if (err.error && err.error.code) {
          const code = err.error.code;
          if (code === 'user-not-found') {
            message = 'No existe una cuenta con ese correo.';
          } else if (code === 'invalid-email') {
            message = 'Correo inválido 📧';
          }
        }
        
        this.snackBar.open(message, 'Cerrar', {
          duration: 4000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
