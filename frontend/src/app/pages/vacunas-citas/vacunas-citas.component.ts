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
import { VacunasCitasService } from '../../services/vacunas-citas.service';
import { VacunaCita } from '../../models';

// ==========================================
//  COMPONENTE DIÁLOGO: AGREGAR REGISTRO
// ==========================================
@Component({
  selector: 'app-agregar-vacuna-cita-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Añadir Vacuna o Cita</h2>
    <mat-dialog-content>
      <form [formGroup]="registroForm" class="dialog-form">
        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Nombre de la mascota</mat-label>
          <input matInput formControlName="nombreMascota">
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
          <mat-label>Vacuna o Cita</mat-label>
          <input matInput formControlName="vacunaOCita">
        </mat-form-field>

        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Fecha (ej. YYYY-MM-DD)</mat-label>
          <input matInput formControlName="fecha" placeholder="2026-08-30">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="warn" (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="registroForm.invalid" (click)="onSave()">Guardar</button>
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
export class AgregarVacunaCitaDialogComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarVacunaCitaDialogComponent>
  ) {
    this.registroForm = this.fb.group({
      nombreMascota: ['', [Validators.required]],
      nombrePropietario: ['', [Validators.required]],
      numeroIdentificacionPropietario: ['', [Validators.required]],
      vacunaOCita: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.registroForm.valid) {
      this.dialogRef.close(this.registroForm.value);
    }
  }
}

// ==========================================
//  COMPONENTE DIÁLOGO: MOSTRAR LISTADO
// ==========================================
@Component({
  selector: 'app-ver-registros-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Historial de Vacunas y Citas</h2>
    <mat-dialog-content style="min-width: 320px; max-height: 400px; overflow-y: auto;">
      <div *ngIf="data.length === 0" style="padding: 10px 0;">No hay registros de vacunas/citas 🗓️</div>
      <div *ngFor="let item of data" class="list-item">
        <mat-icon class="calendar-icon">calendar_month</mat-icon>
        <div class="record-info">
          <div class="pet-name">{{ item.nombreMascota }}</div>
          <div class="details">{{ item.vacunaOCita }}</div>
          <div class="date">Fecha: {{ item.fecha }}</div>
          <div class="owner">Propietario: {{ item.nombrePropietario }} · ID: {{ item.numeroIdentificacionPropietario }}</div>
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
    .calendar-icon {
      color: var(--primary-color);
      margin-right: 16px;
    }
    .record-info .pet-name {
      font-weight: 600;
    }
    .record-info .details, .record-info .date, .record-info .owner {
      font-size: 13px;
      opacity: 0.85;
    }
  `]
})
export class VerRegistrosDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VerRegistrosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VacunaCita[]
  ) {}
}

// ==========================================
//  COMPONENTE PRINCIPAL: VACUNAS Y CITAS
// ==========================================
@Component({
  selector: 'app-vacunas-citas',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule],
  template: `
    <div class="page-container fade-in">
      <!-- Botones de Acción -->
      <div class="actions-row mb-4">
        <button mat-raised-button color="primary" class="btn-primary" (click)="verRegistrosDialog()">
          <mat-icon>list</mat-icon>
          Ver Registros
        </button>
        
        <button mat-raised-button color="accent" class="btn-primary" (click)="agregarRegistroDialog()">
          <mat-icon>add</mat-icon>
          Añadir
        </button>
      </div>

      <!-- Listado Principal -->
      <div *ngIf="vacunasCitas.length === 0" class="empty-state flex-center flex-column">
        <p>No hay registros de vacunas o citas 🗓️</p>
      </div>

      <div *ngIf="vacunasCitas.length > 0" class="cards-list">
        <mat-card *ngFor="let item of vacunasCitas" class="record-card mat-mdc-card mb-4">
          <mat-card-content class="flex-row-align">
            <div class="avatar-container flex-center">
              <mat-icon class="avatar-icon">vaccines</mat-icon>
            </div>
            
            <div class="details-container">
              <h3 class="pet-name">{{ item.nombreMascota }}</h3>
              <p class="record-desc">{{ item.vacunaOCita }}</p>
              <p class="record-date">Fecha: {{ item.fecha }}</p>
              <p class="record-owner">Propietario: {{ item.nombrePropietario }} · ID: {{ item.numeroIdentificacionPropietario }}</p>
            </div>
            
            <button mat-icon-button color="warn" (click)="eliminarRegistro(item)" aria-label="Eliminar registro">
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
    
    .record-card {
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
    
    .record-desc, .record-date, .record-owner {
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
export class VacunasCitasComponent implements OnInit {
  vacunasCitas: VacunaCita[] = [];

  constructor(
    private service: VacunasCitasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.vacunasCitas = data;
      },
      error: (err) => {
        this.snackBar.open(`Error al cargar registros: ${err.message}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  agregarRegistroDialog(): void {
    const dialogRef = this.dialog.open(AgregarVacunaCitaDialogComponent);

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.service.create(res).subscribe({
          next: () => {
            this.snackBar.open('Registro añadido exitosamente 💉', 'Cerrar', { duration: 3000 });
            this.cargarRegistros();
          },
          error: (err) => {
            this.snackBar.open(`Error: ${err.message}`, 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  verRegistrosDialog(): void {
    this.dialog.open(VerRegistrosDialogComponent, {
      data: this.vacunasCitas
    });
  }

  eliminarRegistro(item: VacunaCita): void {
    if (!item.id) return;

    this.service.delete(item.id).subscribe({
      next: () => {
        this.snackBar.open(`Registro eliminado correctamente 🗑️`, 'Cerrar', { duration: 3000 });
        this.cargarRegistros();
      },
      error: (err) => {
        this.snackBar.open(`Error al eliminar: ${err.message}`, 'Cerrar', { duration: 3000 });
      }
    });
  }
}
