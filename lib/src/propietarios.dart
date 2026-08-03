import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:vetcare/src/Nabar.dart';

class PropietariosPage extends StatefulWidget {
  const PropietariosPage({super.key});

  @override
  State<PropietariosPage> createState() => _PropietariosPageState();
}

class _PropietariosPageState extends State<PropietariosPage> {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  List<Map<String, dynamic>> propietarios = [];

  final TextEditingController nombreCtrl = TextEditingController();
  final TextEditingController telefonoCtrl = TextEditingController();
  final TextEditingController direccionCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    cargarPropietarios();
  }

  // --- Cargar desde Firebase ---
  Future<void> cargarPropietarios() async {
    try {
      final snapshot = await _db.collection('propietarios').get();
      setState(() {
        propietarios = snapshot.docs.map((doc) {
          final data = doc.data();
          return {
            "id": doc.id,
            "nombre": data["nombre"] ?? "",
            "telefono": data["telefono"] ?? "",
            "direccion": data["direccion"] ?? "",
          };
        }).toList();
      });
    } catch (e) {
      debugPrint("❌ Error al cargar propietarios: $e");
    }
  }

  // --- Guardar en Firebase ---
  Future<void> guardarPropietario(Map<String, dynamic> propietario) async {
    try {
      await _db.collection('propietarios').add(propietario);
      await cargarPropietarios();
    } catch (e) {
      debugPrint("❌ Error al guardar propietario: $e");
    }
  }

  // --- Eliminar en Firebase ---
  Future<void> eliminarPropietario(String id) async {
    try {
      await _db.collection('propietarios').doc(id).delete();
      await cargarPropietarios();
    } catch (e) {
      debugPrint("❌ Error al eliminar propietario: $e");
    }
  }

  // --- Mostrar formulario para agregar ---
  void mostrarFormularioAgregarPropietario() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          title: const Text('Añadir nuevo propietario'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nombreCtrl,
                  decoration: const InputDecoration(
                    labelText: 'Nombre Completo',
                    prefixIcon: Icon(Icons.person),
                  ),
                ),
                TextField(
                  controller: telefonoCtrl,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'Teléfono',
                    prefixIcon: Icon(Icons.phone),
                  ),
                ),
                TextField(
                  controller: direccionCtrl,
                  decoration: const InputDecoration(
                    labelText: 'Dirección',
                    prefixIcon: Icon(Icons.location_on),
                  ),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text(
                'Cancelar',
                style: TextStyle(color: Colors.red),
              ),
            ),
            ElevatedButton(
              onPressed: () async {
                if (nombreCtrl.text.isNotEmpty &&
                    telefonoCtrl.text.isNotEmpty &&
                    direccionCtrl.text.isNotEmpty) {
                  final nuevoPropietario = {
                    "nombre": nombreCtrl.text,
                    "telefono": telefonoCtrl.text,
                    "direccion": direccionCtrl.text,
                  };

                  await guardarPropietario(nuevoPropietario);

                  nombreCtrl.clear();
                  telefonoCtrl.clear();
                  direccionCtrl.clear();

                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Propietario añadido exitosamente 👤'),
                    ),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Por favor completar todos los campos 📝'),
                    ),
                  );
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

  // --- Mostrar lista de propietarios ---
  void mostrarPropietariosGuardados() {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Lista de Propietarios"),
        content: SizedBox(
          width: double.maxFinite,
          child: propietarios.isEmpty
              ? const Text("No hay propietarios registrados 👤")
              : ListView.builder(
                  shrinkWrap: true,
                  itemCount: propietarios.length,
                  itemBuilder: (context, index) {
                    final propietario = propietarios[index];
                    return ListTile(
                      leading: const Icon(Icons.person, color: Colors.teal),
                      title: Text(
                        propietario["nombre"] ?? "",
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Text(
                        "Tel: ${propietario["telefono"]}\nDir: ${propietario["direccion"]}",
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
    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text('Lista de Propietarios'),
        backgroundColor: Colors.teal,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton.icon(
                  onPressed: mostrarPropietariosGuardados,
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.teal),
                  icon: const Icon(Icons.list, color: Colors.white),
                  label: const Text(
                    "Ver Propietarios",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: mostrarFormularioAgregarPropietario,
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.teal),
                  icon: const Icon(Icons.add, color: Colors.white),
                  label: const Text(
                    "Añadir",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: propietarios.length,
                itemBuilder: (context, index) {
                  final propietario = propietarios[index];
                  return Card(
                    elevation: 4,
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: ListTile(
                      leading: const CircleAvatar(
                        backgroundColor: Colors.teal,
                        child: Icon(Icons.person, color: Colors.white),
                      ),
                      title: Text(
                        propietario["nombre"] ?? "",
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                        ),
                      ),
                      subtitle: Text(
                        "Teléfono: ${propietario["telefono"]}\nDirección: ${propietario["direccion"]}",
                      ),
                      isThreeLine: true,
                      trailing: IconButton(
                        icon: const Icon(Icons.delete, color: Colors.redAccent),
                        onPressed: () async {
                          await eliminarPropietario(propietario["id"]);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(
                                '${propietario["nombre"]} ha sido eliminado 🗑️',
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
