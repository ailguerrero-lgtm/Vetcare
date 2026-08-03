export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export interface AuthResponse {
  usuario: Usuario;
  token: string;
}

export interface Mascota {
  id?: string;
  nombre: string;
  especie?: string;
  raza?: string;
  edad: string;
  nombrePropietario: string;
  numeroIdentificacionPropietario: string;
  createdAt?: string;
}

export interface Propietario {
  id?: string;
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface VacunaCita {
  id?: string;
  nombreMascota: string;
  nombrePropietario: string;
  numeroIdentificacionPropietario: string;
  vacunaOCita: string;
  fecha: string;
}
