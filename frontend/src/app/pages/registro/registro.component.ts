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
  selector: 'app-registro',
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
    <div class="register-wrapper flex-center min-h-screen">
      <mat-card class="register-card glass-panel fade-in">
        <mat-card-header>
          <mat-card-title class="register-title">Crear nueva cuenta 🐾</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex-column mt-4">
            <mat-form-field appearance="outline" class="mb-4">
              <mat-label>Nombre completo</mat-label>
              <input matInput formControlName="nombre" placeholder="Juan Pérez">
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="registerForm.get('nombre')?.hasError('required')">El nombre es requerido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="mb-4">
              <mat-label>Correo electrónico</mat-label>
              <input matInput type="email" formControlName="email" placeholder="ejemplo@correo.com">
              <mat-icon matSuffix>account_circle</mat-icon>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">El correo es requerido</mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">Ingresa un correo válido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="mb-4">
              <mat-label>Contraseña</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">La contraseña es requerida</mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">Mínimo 6 caracteres</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" class="btn-submit btn-primary" type="submit" [disabled]="loading">
              <span>Registrarse</span>
            </button>
          </form>

          <div class="actions-row mt-4 flex-center">
            <a mat-button routerLink="/login">¿Ya tienes cuenta? Iniciar Sesión</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
    }
    
    .register-card {
      width: 400px;
      padding: 24px;
    }
    
    .register-title {
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
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    const { nombre, email, password } = this.registerForm.value;

    this.authService.register(nombre, email, password).subscribe({
      next: () => {
        this.snackBar.open('Usuario registrado con éxito ✅', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        let message = 'Error al registrar usuario ❌';
        
        if (err.error && err.error.code) {
          const code = err.error.code;
          if (code === 'email-already-in-use') {
            message = 'El correo ya está en uso 📧';
          } else if (code === 'invalid-email') {
            message = 'Correo electrónico inválido ❌';
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
