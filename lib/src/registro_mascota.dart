import 'package:flutter/material.dart';
import 'package:vetcare/src/Nabar.dart';
import 'package:cloud_firestore/cloud_firestore.dart'; // ✅ Import para Firebase Firestore

class RegistroMascotaPage extends StatefulWidget {
  const RegistroMascotaPage({super.key});

  @override
  State<RegistroMascotaPage> createState() => _RegistroMascotaPageState();
}

class _RegistroMascotaPageState extends State<RegistroMascotaPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController nombreController = TextEditingController();
  final TextEditingController especieController = TextEditingController();
  final TextEditingController razaController = TextEditingController();
  final TextEditingController edadController = TextEditingController();

  static final List<Map<String, String>> historialMascotas = [];

  // 🔹 Función para guardar mascota localmente y en Firebase
  Future<void> _guardarMascota() async {
    if (_formKey.currentState!.validate()) {
      final nuevaMascota = {
        'nombre': nombreController.text,
        'especie': especieController.text,
        'raza': razaController.text,
        'edad': edadController.text,
      };

      // ✅ Guardar en lista local
      historialMascotas.add(nuevaMascota);

      try {
        // ✅ Guardar en Firebase Firestore
        await FirebaseFirestore.instance.collection('mascotas').add({
          'nombre': nombreController.text,
          'especie': especieController.text,
          'raza': razaController.text,
          'edad': edadController.text,
          'fechaRegistro': DateTime.now(),
        });

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Mascota registrada y guardada en Firebase ✅'),
          ),
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('⚠️ Error al guardar en Firebase: $e')),
        );
      }

      // Limpiar campos
      nombreController.clear();
      especieController.clear();
      razaController.clear();
      edadController.clear();

      // Ir a historial
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) =>
              HistorialMascotasPage(historialMascotas: historialMascotas),
        ),
      );
    }
  }

  void _verHistorial() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) =>
            HistorialMascotasPage(historialMascotas: historialMascotas),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text('Registrar Mascota'),
        backgroundColor: Colors.teal,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blueGrey,
                      padding: const EdgeInsets.symmetric(
                        vertical: 10,
                        horizontal: 10,
                      ),
                    ),
                    icon: const Icon(Icons.list, color: Colors.white),
                    label: const Text(
                      'Ver historial de mascotas',
                      style: TextStyle(color: Colors.white, fontSize: 14),
                    ),
                    onPressed: _verHistorial,
                  ),
                ],
              ),
              const SizedBox(height: 20),
              const Text(
                ' Registro de Mascota ',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 30),
              TextFormField(
                controller: nombreController,
                decoration: const InputDecoration(
                  labelText: 'Nombre de la mascota',
                  border: OutlineInputBorder(),
                ),
                validator: (value) =>
                    value!.isEmpty ? 'Por favor ingrese el nombre' : null,
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: especieController,
                decoration: const InputDecoration(
                  labelText: 'Especie (Perro, Gato, etc.)',
                  border: OutlineInputBorder(),
                ),
                validator: (value) =>
                    value!.isEmpty ? 'Ingrese la especie' : null,
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: razaController,
                decoration: const InputDecoration(
                  labelText: 'Raza',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: edadController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Edad (en años)',
                  border: OutlineInputBorder(),
                ),
                validator: (value) => value!.isEmpty ? 'Ingrese la edad' : null,
              ),
              const SizedBox(height: 30),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.teal,
                  padding: const EdgeInsets.symmetric(vertical: 15),
                ),
                icon: const Icon(Icons.save, color: Colors.white),
                label: const Text(
                  'Guardar Mascota',
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
                onPressed: _guardarMascota,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// 🔹 Pantalla de Historial de Mascotas
class HistorialMascotasPage extends StatelessWidget {
  final List<Map<String, String>> historialMascotas;

  const HistorialMascotasPage({super.key, required this.historialMascotas});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text('Historial de Mascotas'),
        backgroundColor: Colors.teal,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: historialMascotas.isEmpty
            ? const Center(
                child: Text(
                  'No hay mascotas registradas aún 🐾',
                  style: TextStyle(fontSize: 18, color: Colors.grey),
                ),
              )
            : ListView.builder(
                itemCount: historialMascotas.length,
                itemBuilder: (context, index) {
                  final mascota = historialMascotas[index];
                  return Card(
                    elevation: 3,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                    child: ListTile(
                      leading: const Icon(Icons.pets, color: Colors.teal),
                      title: Text(mascota['nombre'] ?? ''),
                      subtitle: Text(
                        'Especie: ${mascota['especie']}\n'
                        'Raza: ${mascota['raza']}\n'
                        'Edad: ${mascota['edad']} años',
                      ),
                    ),
                  );
                },
              ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: Colors.teal,
        icon: const Icon(Icons.add),
        label: const Text('Registrar nueva mascota'),
        onPressed: () {
          Navigator.pop(context); // 🔙 Vuelve al formulario
        },
      ),
    );
  }
}
