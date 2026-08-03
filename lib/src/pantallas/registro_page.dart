import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class RegistroPage extends StatelessWidget {
  const RegistroPage({super.key});

  Future<void> _registrarUsuario(
    BuildContext context,
    String correo,
    String contrasena,
  ) async {
    try {
      await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: correo,
        password: contrasena,
      );

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Usuario registrado con éxito ✅'),
          backgroundColor: Colors.green,
        ),
      );

      Navigator.pushReplacementNamed(context, '/login');
    } on FirebaseAuthException catch (e) {
      String mensaje = 'Error al registrar usuario ❌';

      if (e.code == 'email-already-in-use') {
        mensaje = 'El correo ya está en uso 📧';
      } else if (e.code == 'invalid-email') {
        mensaje = 'Correo electrónico inválido ❌';
      } else if (e.code == 'weak-password') {
        mensaje = 'La contraseña es muy débil (mínimo 6 caracteres).';
      }

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(mensaje), backgroundColor: Colors.redAccent),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e'), backgroundColor: Colors.redAccent),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final TextEditingController nombreController = TextEditingController();
    final TextEditingController usuarioController = TextEditingController();
    final TextEditingController contrasenaController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Registro de Usuario'),
        backgroundColor: Colors.teal,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Crear nueva cuenta 🐾',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: nombreController,
              decoration: const InputDecoration(
                labelText: 'Nombre completo',
                prefixIcon: Icon(Icons.person),
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: usuarioController,
              decoration: const InputDecoration(
                labelText: 'Correo electrónico',
                prefixIcon: Icon(Icons.account_circle),
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 10),
            TextField(
              controller: contrasenaController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Contraseña',
                prefixIcon: Icon(Icons.lock),
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                final correo = usuarioController.text.trim();
                final contrasena = contrasenaController.text.trim();

                if (correo.isEmpty || contrasena.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Por favor completa todos los campos ⚠️'),
                      backgroundColor: Colors.orange,
                    ),
                  );
                  return;
                }

                _registrarUsuario(context, correo, contrasena);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.teal,
                minimumSize: const Size(double.infinity, 45),
              ),
              child: const Text('Registrarse'),
            ),
          ],
        ),
      ),
    );
  }
}
