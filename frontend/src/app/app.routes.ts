import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroMascotaComponent } from './pages/registro-mascota/registro-mascota.component';
import { HistorialMascotasComponent } from './pages/historial-mascotas/historial-mascotas.component';
import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { VacunasCitasComponent } from './pages/vacunas-citas/vacunas-citas.component';
import { PropietariosComponent } from './pages/propietarios/propietarios.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { HardwareComponent } from './pages/hardware/hardware.component';
import { PageOneComponent } from './pages/auxiliar/page-one.component';
import { PageTwoComponent } from './pages/auxiliar/page-two.component';
import { PageThreeComponent } from './pages/auxiliar/page-three.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Rutas públicas de autenticación
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarComponent },

  // Rutas privadas protegidas por AuthGuard
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'registro-mascota', component: RegistroMascotaComponent },
      { path: 'historial-mascotas', component: HistorialMascotasComponent },
      { path: 'lista-mascotas', component: ListaMascotasComponent },
      { path: 'vacunas-citas', component: VacunasCitasComponent },
      { path: 'propietarios', component: PropietariosComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'hardware', component: HardwareComponent },
      
      // Rutas auxiliares importadas de Flutter
      { path: 'page-one', component: PageOneComponent },
      { path: 'page-two', component: PageTwoComponent },
      { path: 'page-three', component: PageThreeComponent }
    ]
  },

  // Redirección por defecto
  { path: '**', redirectTo: '' }
];
