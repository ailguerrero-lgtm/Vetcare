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
import { MascotasService } from '../../services/mascotas.service';

@Component({
  selector: 'app-registro-mascota',
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
    <div class="page-container fade-in">
      <div class="top-row mb-4">
        <button mat-raised-button color="accent" class="btn-primary" routerLink="/historial-mascotas">
          <mat-icon>list</mat-icon>
          Ver historial de mascotas
        </button>
      </div>

      <div class="flex-center">
        <mat-card class="form-card mat-mdc-card">
          <mat-card-header class="flex-center">
            <mat-card-title class="form-title">Registro de Mascota</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="petForm" (ngSubmit)="onSubmit()" class="flex-column mt-4">
              <mat-form-field appearance="outline" class="mb-4">
                <mat-label>Nombre de la mascota</mat-label>
                <input matInput formControlName="nombre" placeholder="Firulais">
                <mat-error *ngIf="petForm.get('nombre')?.hasError('required')">Por favor ingrese el nombre</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="mb-4">
                <mat-label>Nombre del propietario</mat-label>
                <input matInput formControlName="nombrePropietario" placeholder="Juan Pérez">
                <mat-error *ngIf="petForm.get('nombrePropietario')?.hasError('required')">Ingrese el nombre del propietario</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="mb-4">
                <mat-label>Número de identificación del propietario</mat-label>
                <input matInput formControlName="numeroIdentificacionPropietario" placeholder="12345678">
                <mat-error *ngIf="petForm.get('numeroIdentificacionPropietario')?.hasError('required')">Ingrese el número de identificación</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="mb-4">
                <mat-label>Especie (Perro, Gato, etc.)</mat-label>
                <input matInput formControlName="especie" placeholder="Perro">
                <mat-error *ngIf="petForm.get('especie')?.hasError('required')">Ingrese la especie</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="mb-4">
                <mat-label>Raza</mat-label>
                <input matInput formControlName="raza" placeholder="Mestizo">
              </mat-form-field>

              <mat-form-field appearance="outline" class="mb-4">
                <mat-label>Edad (en años)</mat-label>
                <input matInput type="number" formControlName="edad" placeholder="3">
                <mat-error *ngIf="petForm.get('edad')?.hasError('required')">Ingrese la edad</mat-error>
              </mat-form-field>

              <button mat-raised-button color="primary" class="btn-submit btn-primary" type="submit" [disabled]="loading">
                <mat-icon>save</mat-icon>
                <span>Guardar Mascota</span>
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .top-row {
      display: flex;
      justify-content: flex-start;
    }
    
    .form-card {
      width: 100%;
      max-width: 500px;
      padding: 20px;
    }
    
    .form-title {
      font-size: 22px !important;
      font-weight: 700;
      color: var(--primary-color);
      text-align: center;
      margin: 10px 0;
    }
    
    .btn-submit {
      height: 48px;
      border-radius: 8px !important;
      font-size: 16px;
      font-weight: 600;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  `]
})
export class RegistroMascotaComponent implements OnInit {
  petForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.petForm = this.fb.group({
      nombre: ['', [Validators.required]],
      nombrePropietario: ['', [Validators.required]],
      numeroIdentificacionPropietario: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      raza: [''],
      edad: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.petForm.invalid) return;

    this.loading = true;
    const petData = this.petForm.value;

    this.mascotasService.create(petData).subscribe({
      next: () => {
        this.snackBar.open('Mascota registrada y guardada correctamente ✅', 'Cerrar', {
          duration: 3000
        });
        // Limpiamos los campos
        this.petForm.reset({
          nombre: '',
          nombrePropietario: '',
          numeroIdentificacionPropietario: '',
          especie: '',
          raza: '',
          edad: ''
        });
        this.loading = false;
        
        // Redirigir a historial de mascotas
        this.router.navigate(['/historial-mascotas']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(`⚠️ Error al guardar: ${err.message}`, 'Cerrar', {
          duration: 4000
        });
      }
    });
  }
}
