import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../models';

// ==========================================
//  COMPONENTE DIÁLOGO: AGREGAR MASCOTA
// ==========================================
@Component({
  selector: 'app-agregar-mascota-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Añadir nueva mascota</h2>
    <mat-dialog-content>
      <form [formGroup]="mascotaForm" class="dialog-form">
        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Nombre de la mascota</mat-label>
          <input matInput formControlName="nombre">
        </mat-form-field>

        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Especie</mat-label>
          <input matInput formControlName="especie">
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Nombre del propietario</mat-label>
          <input matInput formControlName="nombrePropietario">
        </mat-form-field>

        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Número de identificación del propietario</mat-label>
          <input matInput formControlName="numeroIdentificacionPropietario">
        </mat-form-field>

        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Raza</mat-label>
          <input matInput formControlName="raza">
        </mat-form-field>

        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Edad (años)</mat-label>
          <input matInput type="number" formControlName="edad">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="warn" (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="mascotaForm.invalid" (click)="onSave()">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 280px;
      width: 100%;
      padding: 4px 0;
    }

    .dialog-field {
      width: 100%;
      margin: 0;
    }
  `]
})
export class AgregarMascotaDialogComponent {
  mascotaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarMascotaDialogComponent>
  ) {
    this.mascotaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      nombrePropietario: ['', [Validators.required]],
      numeroIdentificacionPropietario: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      edad: ['', [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.mascotaForm.valid) {
      this.dialogRef.close(this.mascotaForm.value);
    }
  }
}

// ==========================================
//  COMPONENTE DIÁLOGO: MOSTRAR LISTADO
// ==========================================
@Component({
  selector: 'app-ver-mascotas-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Lista de Mascotas</h2>
    <mat-dialog-content style="min-width: 320px; max-height: 400px; overflow-y: auto;">
      <div *ngIf="data.length === 0" style="padding: 10px 0;">No hay mascotas registradas 🐕</div>
      <div *ngFor="let mascota of data" class="list-item">
        <mat-icon class="pet-icon">pets</mat-icon>
        <div class="pet-info">
          <div class="name">{{ mascota.nombre }}</div>
          <div class="breed">{{ mascota.raza }} - Edad: {{ mascota.edad }} años</div>
          <div class="owner">Propietario: {{ mascota.nombrePropietario }} · ID: {{ mascota.numeroIdentificacionPropietario }}</div>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .list-item {
      display: flex;
      align-items: center;
      padding: 12px 8px;
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .pet-icon {
      color: var(--primary-color);
      margin-right: 16px;
    }
    .pet-info .name {
      font-weight: 600;
    }
    .pet-info .breed {
      font-size: 13px;
      opacity: 0.8;
    }
    .pet-info .owner {
      font-size: 12px;
      opacity: 0.75;
      margin-top: 2px;
    }
  `]
})
export class VerMascotasDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VerMascotasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mascota[]
  ) {}
}

// ==========================================
//  COMPONENTE PRINCIPAL: LISTA MASCOTAS
// ==========================================
@Component({
  selector: 'app-lista-mascotas',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule],
  template: `
    <div class="page-container fade-in">
      <!-- Botones de Acción -->
      <div class="actions-row mb-4">
        <button mat-raised-button color="primary" class="btn-primary" (click)="verMascotasDialog()">
          <mat-icon>list</mat-icon>
          Ver mascotas
        </button>
        
        <button mat-raised-button color="accent" class="btn-primary" (click)="agregarMascotaDialog()">
          <mat-icon>add</mat-icon>
          Añadir
        </button>
      </div>

      <!-- Listado Principal (Simulado en tiempo real) -->
      <div *ngIf="mascotas.length === 0" class="empty-state flex-center flex-column">
        <p>No hay mascotas registradas.</p>
      </div>

      <div *ngIf="mascotas.length > 0" class="cards-list">
        <mat-card *ngFor="let pet of mascotas" class="pet-card mat-mdc-card mb-4">
          <mat-card-content class="flex-row-align">
            <div class="avatar-container flex-center">
              <mat-icon class="avatar-icon">pets</mat-icon>
            </div>
            
            <div class="details-container">
              <h3 class="pet-name">{{ pet.nombre }}</h3>
              <p class="pet-desc">{{ pet.raza }}</p>
              <p class="pet-age">Edad: {{ pet.edad }} años</p>
              <p class="pet-owner">Propietario: {{ pet.nombrePropietario }} · ID: {{ pet.numeroIdentificacionPropietario }}</p>
            </div>
            
            <button mat-icon-button color="warn" (click)="eliminarMascota(pet)" aria-label="Eliminar mascota">
              <mat-icon class="delete-icon">delete</mat-icon>
            </button>
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
    
    .actions-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    
    .empty-state {
      padding: 40px;
      color: #94a3b8;
      text-align: center;
      font-size: 16px;
    }
    
    .pet-card {
      margin-bottom: 16px;
    }
    
    .flex-row-align {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 16px !important;
    }
    
    .avatar-container {
      width: 50px;
      height: 50px;
      background-color: var(--primary-color);
      border-radius: 50%;
      color: #ffffff;
    }
    
    .avatar-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    
    .details-container {
      flex: 1;
    }
    
    .pet-name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
      color: var(--text-primary);
    }
    
    .pet-desc, .pet-age, .pet-owner {
      font-size: 14px;
      margin: 0;
      color: var(--text-secondary);
      line-height: 1.4;
    }
    
    .delete-icon {
      color: #ef4444;
    }
  `]
})
export class ListaMascotasComponent implements OnInit {
  mascotas: Mascota[] = [];

  constructor(
    private mascotasService: MascotasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mascotasService.mascotas$.subscribe((data) => {
      this.mascotas = data;
    });

    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.mascotasService.getAll().subscribe({
      next: () => {
        this.mascotas = this.mascotasService.getLocalHistorial();
      },
      error: (err) => {
        this.snackBar.open(`Error al cargar mascotas: ${err.message}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  agregarMascotaDialog(): void {
    const dialogRef = this.dialog.open(AgregarMascotaDialogComponent);

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.mascotasService.create({
          nombre: res.nombre,
          raza: res.raza,
          edad: res.edad.toString(),
          especie: res.especie || 'Perro',
          nombrePropietario: res.nombrePropietario,
          numeroIdentificacionPropietario: res.numeroIdentificacionPropietario
        }).subscribe({
          next: () => {
            this.snackBar.open('Mascota añadida exitosamente 🐶', 'Cerrar', { duration: 3000 });
            this.cargarMascotas();
          },
          error: (err) => {
            this.snackBar.open(`Error: ${err.message}`, 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  verMascotasDialog(): void {
    this.dialog.open(VerMascotasDialogComponent, {
      data: this.mascotas
    });
  }

  eliminarMascota(pet: Mascota): void {
    if (!pet.id) return;
    
    this.mascotasService.delete(pet.id).subscribe({
      next: () => {
        this.snackBar.open(`${pet.nombre} ha sido eliminado 🗑️`, 'Cerrar', { duration: 3000 });
        this.cargarMascotas();
      },
      error: (err) => {
        this.snackBar.open(`Error al eliminar: ${err.message}`, 'Cerrar', { duration: 3000 });
      }
    });
  }
}
