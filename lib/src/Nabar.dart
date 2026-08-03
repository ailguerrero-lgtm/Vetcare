import 'package:flutter/material.dart';

class Nabar extends StatelessWidget {
  const Nabar({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(color: Colors.teal),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset(
                  'assets/images/logo.png',
                  width: 90,
                  height: 90,
                  fit: BoxFit.contain,
                ),
                const SizedBox(height: 10),
                const Text(
                  'VetCare',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),

          // Opciones del menú
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Inicio'),
            onTap: () {
              // 🔹 Corregido: la ruta ahora va al inicio real
              Navigator.pushReplacementNamed(context, '/');
            },
          ),
          const Divider(),

          ListTile(
            leading: const Icon(Icons.add_circle),
            title: const Text('Registrar Mascota'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/registroMascota');
            },
          ),
          ListTile(
            leading: const Icon(Icons.list),
            title: const Text('Lista de Mascotas'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/listaMascotas');
            },
          ),
          ListTile(
            leading: const Icon(Icons.vaccines),
            title: const Text('Vacunas y Citas'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/vacunasCitas');
            },
          ),
          ListTile(
            leading: const Icon(Icons.people),
            title: const Text('Propietarios'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/propietarios');
            },
          ),
          ListTile(
            leading: const Icon(Icons.settings),
            title: const Text('Configuración'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/configuracion');
            },
          ),
          const Divider(),

          // Recursos QR Móvil
          ListTile(
            leading: const Icon(Icons.qr_code),
            title: const Text(
              'Recursos del QR Móvil',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/hardware');
            },
          ),
          const Divider(),

          // Cerrar sesión
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.redAccent),
            title: const Text(
              'Cerrar sesión',
              style: TextStyle(
                color: Colors.redAccent,
                fontWeight: FontWeight.w600,
              ),
            ),
            onTap: () {
              //  Redirige correctamente al login
              Navigator.pushReplacementNamed(context, '/login');
            },
          ),
        ],
      ),
    );
  }
}
