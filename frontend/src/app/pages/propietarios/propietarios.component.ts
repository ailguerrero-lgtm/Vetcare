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
import { PropietariosService } from '../../services/propietarios.service';
import { Propietario, Mascota } from '../../models';
import { MascotasService } from '../../services/mascotas.service';

// ==========================================
//  COMPONENTE DIÁLOGO: AGREGAR PROPIETARIO
// ==========================================
@Component({
  selector: 'app-agregar-propietario-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Añadir nuevo propietario</h2>
    <mat-dialog-content>
      <form [formGroup]="propietarioForm" class="dialog-form">
        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Nombre Completo</mat-label>
          <input matInput formControlName="nombre">
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Teléfono</mat-label>
          <input matInput formControlName="telefono" type="tel">
        </mat-form-field>

        <mat-form-field appearance="outline" class="dialog-field">
          <mat-label>Dirección</mat-label>
          <input matInput formControlName="direccion">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="warn" (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="propietarioForm.invalid" (click)="onSave()">Guardar</button>
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
export class AgregarPropietarioDialogComponent {
  propietarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarPropietarioDialogComponent>
  ) {
    this.propietarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.propietarioForm.valid) {
      this.dialogRef.close(this.propietarioForm.value);
    }
  }
}

// ==========================================
//  COMPONENTE DIÁLOGO: MOSTRAR LISTADO
// ==========================================
@Component({
  selector: 'app-ver-propietarios-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Lista de Propietarios</h2>
    <mat-dialog-content style="min-width: 320px; max-height: 400px; overflow-y: auto;">
      <div *ngIf="data.length === 0" style="padding: 10px 0;">No hay propietarios registrados 👤</div>
      <div *ngFor="let propietario of data" class="list-item">
        <mat-icon class="owner-icon">person</mat-icon>
        <div class="owner-info">
          <div class="name">{{ propietario.nombre }}</div>
          <div class="contact">Tel: {{ propietario.telefono }}</div>
          <div class="address">Dir: {{ propietario.direccion }}</div>
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
    .owner-icon {
      color: var(--primary-color);
      margin-right: 16px;
    }
    .owner-info .name {
      font-weight: 600;
    }
    .owner-info .contact, .owner-info .address {
      font-size: 13px;
      opacity: 0.85;
    }
  `]
})
export class VerPropietariosDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VerPropietariosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Propietario[]
  ) {}
}

// ==========================================
//  COMPONENTE PRINCIPAL: PROPIETARIOS
// ==========================================
@Component({
  selector: 'app-propietarios',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule],
  template: `
    <div class="page-container fade-in">
      <!-- Botones de Acción -->
      <div class="actions-row mb-4">
        <button mat-raised-button color="primary" class="btn-primary" (click)="verPropietariosDialog()">
          <mat-icon>list</mat-icon>
          Ver Propietarios
        </button>
        
        <button mat-raised-button color="accent" class="btn-primary" (click)="agregarPropietarioDialog()">
          <mat-icon>add</mat-icon>
          Añadir
        </button>
      </div>

      <!-- Listado Principal -->
      <div *ngIf="propietarios.length === 0" class="empty-state flex-center flex-column">
        <p>No hay propietarios registrados 👤</p>
      </div>

      <div *ngIf="propietarios.length > 0" class="cards-list">
        <mat-card *ngFor="let propietario of propietarios" class="owner-card mat-mdc-card mb-4">
          <mat-card-content class="flex-row-align">
            <div class="avatar-container flex-center">
              <mat-icon class="avatar-icon">person</mat-icon>
            </div>
            
            <div class="details-container">
              <h3 class="owner-name">{{ propietario.nombre }}</h3>
              <p class="owner-desc">Teléfono: {{ propietario.telefono }}</p>
              <p class="owner-desc">Dirección: {{ propietario.direccion }}</p>
              <p class="owner-desc">Mascotas asociadas: {{ getMascotasByPropietario(propietario.nombre).join(', ') || 'Sin mascotas registradas' }}</p>
            </div>
            
            <button mat-icon-button color="warn" (click)="eliminarPropietario(propietario)" aria-label="Eliminar propietario">
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
    
    .owner-card {
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
    
    .owner-name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
      color: var(--text-primary);
    }
    
    .owner-desc {
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
export class PropietariosComponent implements OnInit {
  propietarios: Propietario[] = [];
  mascotas: Mascota[] = [];

  constructor(
    private propietariosService: PropietariosService,
    private mascotasService: MascotasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarPropietarios();
    this.cargarMascotas();
  }

  cargarPropietarios(): void {
    this.propietariosService.getAll().subscribe({
      next: (data) => {
        this.propietarios = data;
      },
      error: (err) => {
        this.snackBar.open(`Error al cargar propietarios: ${err.message}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  cargarMascotas(): void {
    this.mascotasService.getAll().subscribe({
      next: (data) => {
        this.mascotas = data;
      },
      error: (err) => {
        this.snackBar.open(`Error al cargar mascotas: ${err.message}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  agregarPropietarioDialog(): void {
    const dialogRef = this.dialog.open(AgregarPropietarioDialogComponent);

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.propietariosService.create(res).subscribe({
          next: () => {
            this.snackBar.open('Propietario añadido exitosamente 👤', 'Cerrar', { duration: 3000 });
            this.cargarPropietarios();
          },
          error: (err) => {
            this.snackBar.open(`Error: ${err.message}`, 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  verPropietariosDialog(): void {
    this.dialog.open(VerPropietariosDialogComponent, {
      data: this.propietarios
    });
  }

  getMascotasByPropietario(nombrePropietario: string): string[] {
    return this.mascotas
      .filter((mascota) => mascota.nombrePropietario === nombrePropietario)
      .map((mascota) => mascota.nombre);
  }

  eliminarPropietario(propietario: Propietario): void {
    if (!propietario.id) return;

    this.propietariosService.delete(propietario.id).subscribe({
      next: () => {
        this.snackBar.open(`${propietario.nombre} ha sido eliminado 🗑️`, 'Cerrar', { duration: 3000 });
        this.cargarPropietarios();
      },
      error: (err) => {
        this.snackBar.open(`Error al eliminar: ${err.message}`, 'Cerrar', { duration: 3000 });
      }
    });
  }
}
