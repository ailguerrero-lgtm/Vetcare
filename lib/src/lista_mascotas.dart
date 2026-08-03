// lib/src/lista_mascotas.dart
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:vetcare/src/Nabar.dart';

class ListaMascotasPage extends StatefulWidget {
  const ListaMascotasPage({super.key});

  @override
  State<ListaMascotasPage> createState() => _ListaMascotasPageState();
}

class _ListaMascotasPageState extends State<ListaMascotasPage> {
  final FirebaseFirestore db = FirebaseFirestore.instance;

  final TextEditingController nombreController = TextEditingController();
  final TextEditingController razaController = TextEditingController();
  final TextEditingController edadController = TextEditingController();

  // Añade un documento a la colección 'mascotas'
  Future<void> agregarMascotaFirestore(
    String nombre,
    String raza,
    String edad,
  ) async {
    await db.collection('mascotas').add({
      'nombre': nombre,
      'raza': raza,
      'edad': edad,
      'createdAt': FieldValue.serverTimestamp(),
    });
  }

  // Elimina por id del documento
  Future<void> eliminarMascotaFirestore(String docId) async {
    await db.collection('mascotas').doc(docId).delete();
  }

  // Muestra formulario para añadir mascota (llama a agregarMascotaFirestore)
  void mostrarFormularioAgregarMascota() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          title: const Text('Añadir nueva mascota'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nombreController,
                  decoration: const InputDecoration(
                    labelText: 'Nombre',
                    prefixIcon: Icon(Icons.pets),
                  ),
                ),
                TextField(
                  controller: razaController,
                  decoration: const InputDecoration(
                    labelText: 'Raza',
                    prefixIcon: Icon(Icons.draw),
                  ),
                ),
                TextField(
                  controller: edadController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Edad (años)',
                    prefixIcon: Icon(Icons.cake),
                  ),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                nombreController.clear();
                razaController.clear();
                edadController.clear();
                Navigator.pop(context);
              },
              child: const Text(
                'Cancelar',
                style: TextStyle(color: Colors.red),
              ),
            ),
            ElevatedButton(
              onPressed: () async {
                if (nombreController.text.isNotEmpty &&
                    razaController.text.isNotEmpty &&
                    edadController.text.isNotEmpty) {
                  await agregarMascotaFirestore(
                    nombreController.text.trim(),
                    razaController.text.trim(),
                    edadController.text.trim(),
                  );

                  nombreController.clear();
                  razaController.clear();
                  edadController.clear();

                  Navigator.pop(context);
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Mascota añadida exitosamente 🐶'),
                      ),
                    );
                  }
                } else {
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text(
                          'Por favor completar todos los campos 🐾',
                        ),
                      ),
                    );
                  }
                }
              },
              style: ElevatedButton.styleFrom(backgroundColor: Colors.teal),
              child: const Text('Guardar'),
            ),
          ],
        );
      },
    );
  }

  // Muestra listado en un diálogo (snapshot ya maneja la colección)
  void mostrarMascotasGuardadasDialog(List<QueryDocumentSnapshot> docs) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Lista de Mascotas"),
        content: SizedBox(
          width: double.maxFinite,
          child: docs.isEmpty
              ? const Text("No hay mascotas registradas 🐕")
              : ListView.builder(
                  shrinkWrap: true,
                  itemCount: docs.length,
                  itemBuilder: (context, index) {
                    final d = docs[index].data() as Map<String, dynamic>;
                    return ListTile(
                      leading: const Icon(Icons.pets, color: Colors.teal),
                      title: Text(d['nombre']?.toString() ?? ''),
                      subtitle: Text(
                        "${d['raza'] ?? ''}\nEdad: ${d['edad'] ?? ''} años",
                      ),
                    );
                  },
                ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cerrar"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Stream en tiempo real: documentos de 'mascotas' ordenados por createdAt
    final Stream<QuerySnapshot> stream = db
        .collection('mascotas')
        .orderBy('createdAt', descending: true)
        .snapshots();

    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text('Lista de Mascotas'),
        backgroundColor: Colors.teal,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Row de botones (ver + añadir)
            StreamBuilder<QuerySnapshot>(
              stream: stream,
              builder: (context, snapshot) {
                final docs = snapshot.data?.docs ?? [];
                return Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ElevatedButton.icon(
                      onPressed: () => mostrarMascotasGuardadasDialog(docs),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.teal,
                      ),
                      icon: const Icon(Icons.list, color: Colors.white),
                      label: const Text(
                        "Ver mascotas",
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    ElevatedButton.icon(
                      onPressed: mostrarFormularioAgregarMascota,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.teal,
                      ),
                      icon: const Icon(Icons.add, color: Colors.white),
                      label: const Text(
                        "Añadir",
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                );
              },
            ),
            const SizedBox(height: 16),
            // Lista en tiempo real
            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                stream: stream,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (snapshot.hasError) {
                    return Center(child: Text('Error: ${snapshot.error}'));
                  }

                  final docs = snapshot.data?.docs ?? [];
                  if (docs.isEmpty) {
                    return const Center(
                      child: Text('No hay mascotas registradas.'),
                    );
                  }

                  return ListView.builder(
                    itemCount: docs.length,
                    itemBuilder: (context, index) {
                      final doc = docs[index];
                      final data = doc.data() as Map<String, dynamic>;

                      final nombre = data['nombre']?.toString() ?? '';
                      final raza = data['raza']?.toString() ?? '';
                      final edad = data['edad']?.toString() ?? '';

                      return Card(
                        elevation: 4,
                        margin: const EdgeInsets.symmetric(vertical: 10),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                        child: ListTile(
                          leading: const CircleAvatar(
                            backgroundColor: Colors.teal,
                            child: Icon(Icons.pets, color: Colors.white),
                          ),
                          title: Text(
                            nombre,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                          subtitle: Text("$raza\nEdad: $edad años"),
                          isThreeLine: true,
                          trailing: IconButton(
                            icon: const Icon(
                              Icons.delete,
                              color: Colors.redAccent,
                            ),
                            onPressed: () async {
                              await eliminarMascotaFirestore(doc.id);
                              if (mounted) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      '$nombre ha sido eliminado 🗑️',
                                    ),
                                  ),
                                );
                              }
                            },
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    nombreController.dispose();
    razaController.dispose();
    edadController.dispose();
    super.dispose();
  }
}
