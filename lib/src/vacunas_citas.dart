import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:vetcare/src/Nabar.dart';

class VacunasCitasPage extends StatefulWidget {
  const VacunasCitasPage({super.key});

  @override
  State<VacunasCitasPage> createState() => _VacunasCitasPageState();
}

class _VacunasCitasPageState extends State<VacunasCitasPage> {
  List<Map<String, dynamic>> vacunasYCitas = [];
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  final TextEditingController nombreMascotaCtrl = TextEditingController();
  final TextEditingController vacunaOCitaCtrl = TextEditingController();
  final TextEditingController fechaCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    cargarVacunasYCitas();
  }

  // --- Cargar registros desde Firebase ---
  Future<void> cargarVacunasYCitas() async {
    try {
      final snapshot = await _db.collection('vacunas_citas').get();
      setState(() {
        vacunasYCitas = snapshot.docs.map((doc) {
          final data = doc.data();
          return {
            "id": doc.id,
            "nombreMascota": data["nombreMascota"] ?? "",
            "vacunaOCita": data["vacunaOCita"] ?? "",
            "fecha": data["fecha"] ?? "",
          };
        }).toList();
      });
    } catch (e) {
      debugPrint("❌ Error al cargar vacunas/citas: $e");
    }
  }

  // --- Guardar nuevo registro en Firebase ---
  Future<void> guardarVacunaOCita() async {
    try {
      await _db.collection('vacunas_citas').add({
        "nombreMascota": nombreMascotaCtrl.text,
        "vacunaOCita": vacunaOCitaCtrl.text,
        "fecha": fechaCtrl.text,
      });
      await cargarVacunasYCitas();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Registro añadido exitosamente 💉')),
      );
    } catch (e) {
      debugPrint("❌ Error al guardar vacuna/cita: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error al guardar en Firebase ❌')),
      );
    }
  }

  // --- Eliminar registro de Firebase ---
  Future<void> eliminarRegistro(String id) async {
    try {
      await _db.collection('vacunas_citas').doc(id).delete();
      await cargarVacunasYCitas();
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Registro eliminado 🗑️')));
    } catch (e) {
      debugPrint("❌ Error al eliminar registro: $e");
    }
  }

  // --- Formulario para agregar registro ---
  void mostrarFormularioAgregarRegistro() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          title: const Text('Añadir Vacuna o Cita'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nombreMascotaCtrl,
                  decoration: const InputDecoration(
                    labelText: 'Nombre de la mascota',
                    prefixIcon: Icon(Icons.pets),
                  ),
                ),
                TextField(
                  controller: vacunaOCitaCtrl,
                  decoration: const InputDecoration(
                    labelText: 'Vacuna o Cita',
                    prefixIcon: Icon(Icons.vaccines),
                  ),
                ),
                TextField(
                  controller: fechaCtrl,
                  decoration: const InputDecoration(
                    labelText: 'Fecha (ej. YYYY-MM-DD)',
                    prefixIcon: Icon(Icons.calendar_today),
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
                if (nombreMascotaCtrl.text.isNotEmpty &&
                    vacunaOCitaCtrl.text.isNotEmpty &&
                    fechaCtrl.text.isNotEmpty) {
                  await guardarVacunaOCita();
                  nombreMascotaCtrl.clear();
                  vacunaOCitaCtrl.clear();
                  fechaCtrl.clear();
                  Navigator.pop(context);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Por favor completar todos los campos 🐾'),
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

  // --- Mostrar registros guardados ---
  void mostrarRegistrosGuardados() {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Historial de Vacunas y Citas"),
        content: SizedBox(
          width: double.maxFinite,
          child: vacunasYCitas.isEmpty
              ? const Text("No hay registros de vacunas/citas 🗓️")
              : ListView.builder(
                  shrinkWrap: true,
                  itemCount: vacunasYCitas.length,
                  itemBuilder: (context, index) {
                    final item = vacunasYCitas[index];
                    return ListTile(
                      leading: const Icon(
                        Icons.calendar_month,
                        color: Colors.teal,
                      ),
                      title: Text(
                        item["nombreMascota"]!,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Text(
                        "${item["vacunaOCita"]}\nFecha: ${item["fecha"]}",
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
        title: const Text('Vacunas y Citas'),
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
                  onPressed: mostrarRegistrosGuardados,
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.teal),
                  icon: const Icon(Icons.list, color: Colors.white),
                  label: const Text(
                    "Ver Registros",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: mostrarFormularioAgregarRegistro,
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
                itemCount: vacunasYCitas.length,
                itemBuilder: (context, index) {
                  final item = vacunasYCitas[index];
                  return Card(
                    elevation: 4,
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: ListTile(
                      leading: const CircleAvatar(
                        backgroundColor: Colors.teal,
                        child: Icon(Icons.vaccines, color: Colors.white),
                      ),
                      title: Text(
                        item["nombreMascota"]!,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                        ),
                      ),
                      subtitle: Text(
                        "${item["vacunaOCita"]}\nFecha: ${item["fecha"]}",
                      ),
                      isThreeLine: true,
                      trailing: IconButton(
                        icon: const Icon(Icons.delete, color: Colors.redAccent),
                        onPressed: () async {
                          await eliminarRegistro(item["id"]);
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
