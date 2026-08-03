import { Component, ViewChild, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, SidebarComponent, NavbarComponent],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <!-- Menú Lateral -->
      <mat-sidenav #sidenav [mode]="sidenavMode" [opened]="isSidenavOpen" class="sidenav-panel">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      
      <!-- Contenido Principal -->
      <mat-sidenav-content class="sidenav-content flex-column">
        <app-navbar [title]="currentTitle" (toggleSidebar)="sidenav.toggle()"></app-navbar>
        <div class="content-area fade-in flex-1">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      width: 100vw;
      height: 100vh;
      background: transparent;
    }
    
    .sidenav-panel {
      border: none;
      box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    }
    
    .sidenav-content {
      height: 100%;
      background: transparent;
      display: flex;
      flex-direction: column;
    }
    
    .content-area {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
    }
    
    .flex-1 {
      flex: 1;
    }
  `]
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  isSidenavOpen = true;
  sidenavMode: 'side' | 'over' = 'side';
  currentTitle = 'VetCare - Inicio';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.updateTitleByUrl(this.router.url);

    // Actualiza el título del navbar en cada navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateTitleByUrl(event.urlAfterRedirects || event.url);
      
      // Auto-cerrar sidebar en móviles tras navegar
      if (this.sidenavMode === 'over') {
        this.sidenav.close();
      }
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const isMobile = window.innerWidth <= 960;
    this.sidenavMode = isMobile ? 'over' : 'side';
    this.isSidenavOpen = !isMobile;
  }

  private updateTitleByUrl(url: string): void {
    if (url === '/' || url === '/home') {
      this.currentTitle = 'VetCare - Inicio';
    } else if (url.includes('registro-mascota')) {
      this.currentTitle = 'Registrar Mascota';
    } else if (url.includes('historial-mascotas')) {
      this.currentTitle = 'Historial de Mascotas';
    } else if (url.includes('lista-mascotas')) {
      this.currentTitle = 'Lista de Mascotas';
    } else if (url.includes('vacunas-citas')) {
      this.currentTitle = 'Vacunas y Citas';
    } else if (url.includes('propietarios')) {
      this.currentTitle = 'Lista de Propietarios';
    } else if (url.includes('configuracion')) {
      this.currentTitle = 'Configuración';
    } else if (url.includes('hardware')) {
      this.currentTitle = 'Recursos QR móviles';
    } else if (url.includes('page-one')) {
      this.currentTitle = 'Página 1';
    } else if (url.includes('page-two')) {
      this.currentTitle = 'Página 2';
    } else if (url.includes('page-three')) {
      this.currentTitle = 'Página 3';
    } else {
      this.currentTitle = 'VetCare';
    }
    
    // Forzar detección de cambios ya que el título cambia asíncronamente
    this.cdr.detectChanges();
  }
}
