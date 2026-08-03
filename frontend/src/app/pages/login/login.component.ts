import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
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
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-wrapper flex-center min-h-screen">
      <mat-card class="login-card fade-in">
        <div class="login-header">
          <div class="logo-wrap">
            <img src="/images/VetCare.png" alt="VetCare" class="logo-img" />
          </div>
          <div class="header-copy">
            <div class="login-title">VetCare Login</div>
            <div class="login-subtitle">Sistema de registro de mascotas</div>
          </div>
        </div>

        <mat-card-content class="login-content">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
            <div class="field-group">
              <div class="field-label">Correo electrónico*</div>
              <mat-form-field appearance="outline" class="login-field">
                <input matInput type="email" formControlName="email" placeholder="ejemplo@correo.com">
                <mat-icon matSuffix>person</mat-icon>
                <mat-error *ngIf="loginForm.get('email')?.hasError('required')">El correo es requerido</mat-error>
                <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Ingresa un correo válido</mat-error>
              </mat-form-field>
            </div>

            <div class="field-group">
              <div class="field-label">Contraseña*</div>
              <mat-form-field appearance="outline" class="login-field">
                <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
                <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">La contraseña es requerida</mat-error>
              </mat-form-field>
            </div>

            <button mat-raised-button color="primary" class="btn-submit" type="submit" [disabled]="loading">
              <span *ngIf="!loading">Iniciar Sesión</span>
              <mat-spinner *ngIf="loading" diameter="24"></mat-spinner>
            </button>
          </form>

          <div class="actions-row">
            <a mat-button routerLink="/recuperar">¿Olvidaste tu contraseña?</a>
            <a mat-button routerLink="/registro">¿No tienes cuenta? Regístrate</a>
          </div>
        </mat-card-content>

        <div class="login-footer">© 2026 VetCare - Todos los derechos reservados</div>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f3d72 0%, #1b8fb7 52%, #18b8a3 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }

    .login-card {
      width: 420px;
      max-width: 100%;
      background: #ffffff !important;
      border-radius: 24px !important;
      border: none !important;
      box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18) !important;
      overflow: hidden;
      padding: 0;
    }

    .login-header {
      width: 100%;
      background: linear-gradient(135deg, #0f3d72 0%, #1b8fb7 52%, #18b8a3 100%);
      padding: 24px 24px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      color: #ffffff;
    }

    .logo-wrap {
      width: 60px;
      height: 60px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.16);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .logo-img {
      width: 42px;
      height: 42px;
      object-fit: contain;
    }

    .header-copy {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .login-title {
      color: #ffffff !important;
      font-size: 24px !important;
      font-weight: 800;
      line-height: 1.1;
    }

    .login-subtitle {
      color: rgba(255, 255, 255, 0.88);
      font-size: 13px;
      font-weight: 500;
    }

    .login-content {
      padding: 20px 22px 18px !important;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 14px;
    }

    .field-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 6px;
    }

    .field-label {
      color: #1e293b;
      font-size: 14px;
      font-weight: 700;
      text-align: left;
      width: 100%;
      padding-left: 2px;
    }

    .login-field {
      width: 100%;
      margin: 0 auto;
    }

    ::ng-deep .login-card .mat-mdc-form-field-flex {
      background: #ffffff !important;
      border-radius: 14px;
      align-items: center;
      border: 1px solid #d7e2ea !important;
      box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.03);
      min-height: 56px;
    }

    ::ng-deep .login-card .mat-mdc-text-field-wrapper {
      background-color: transparent !important;
      padding: 0 12px !important;
    }

    ::ng-deep .login-card .mat-mdc-form-field-infix {
      min-height: 42px;
      padding: 10px 0 8px 0 !important;
    }

    ::ng-deep .login-card .mat-mdc-form-field-label {
      display: none !important;
    }

    ::ng-deep .login-card .mdc-floating-label {
      display: none !important;
    }

    ::ng-deep .login-card .mdc-floating-label--float-above {
      display: none !important;
    }

    ::ng-deep .login-card .mdc-notched-outline__leading,
    ::ng-deep .login-card .mdc-notched-outline__notch,
    ::ng-deep .login-card .mdc-notched-outline__trailing {
      border: none !important;
    }

    ::ng-deep .login-card input {
      color: #0f172a !important;
      font-size: 15px !important;
      font-weight: 600 !important;
    }

    ::ng-deep .login-card .mat-mdc-form-field-icon-suffix {
      color: #0f172a !important;
      opacity: 1;
    }

    .btn-submit {
      height: 50px;
      width: 100%;
      max-width: 320px;
      border-radius: 16px !important;
      background: linear-gradient(135deg, #0f3d72 0%, #18b8a3 100%) !important;
      color: #ffffff !important;
      font-size: 16px;
      font-weight: 700;
      box-shadow: 0 10px 22px rgba(15, 61, 114, 0.22) !important;
      border: none !important;
    }

    .actions-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 4px;
      margin-top: 16px;
    }

    .actions-row a {
      color: #0f3d72 !important;
      font-weight: 700;
      font-size: 13px;
      min-width: auto;
      text-transform: none;
      text-align: center;
    }

    .login-footer {
      width: 100%;
      text-align: center;
      padding: 10px 16px 16px;
      color: #64748b;
      font-size: 12px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }

    .min-h-screen {
      min-height: 100vh;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['kirito11051913@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.snackBar.open('Inicio de sesión exitoso ✅', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        let message = 'Error al iniciar sesión ❌';
        
        // Mapeo de errores idénticos a los del try/catch de login_page.dart
        if (err.error && err.error.code) {
          const code = err.error.code;
          if (code === 'user-not-found') {
            message = 'Usuario no encontrado 🧐';
          } else if (code === 'wrong-password') {
            message = 'Contraseña incorrecta ❌';
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
