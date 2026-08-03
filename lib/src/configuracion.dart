import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vetcare/lib/theme_provider.dart';
import 'package:vetcare/src/Nabar.dart';

class ConfiguracionPage extends StatefulWidget {
  const ConfiguracionPage({super.key});

  @override
  State<ConfiguracionPage> createState() => _ConfiguracionPageState();
}

class _ConfiguracionPageState extends State<ConfiguracionPage> {
  bool notificaciones = true;
  double tamanoLetra = 16;

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context); // ✅ Acceso al tema global
    final modoOscuro = themeProvider.isDarkMode; // ✅ Lee el estado del tema

    final backgroundColor = modoOscuro ? Colors.black : Colors.white;
    final textColor = modoOscuro ? Colors.white : Colors.black;

    return Scaffold(
      backgroundColor: backgroundColor,
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text('Configuración'),
        backgroundColor: Colors.teal,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            Text(
              "Ajustes Generales",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: textColor,
              ),
            ),
            const SizedBox(height: 20),

            // 🔔 Notificaciones
            SwitchListTile(
              title: Text("Activar notificaciones", style: TextStyle(color: textColor)),
              subtitle: Text(
                "Recibir alertas sobre vacunas y citas próximas",
                style: TextStyle(color: textColor.withOpacity(0.7)),
              ),
              activeColor: Colors.teal,
              value: notificaciones,
              onChanged: (value) {
                setState(() {
                  notificaciones = value; 
                });
              },
            ),

            // 🌙 Modo oscuro global
            SwitchListTile(
              title: Text("Modo oscuro", style: TextStyle(color: textColor)),
              subtitle: Text(
                "Cambia el tema visual de la aplicación",
                style: TextStyle(color: textColor.withOpacity(0.7)),
              ),
              activeColor: Colors.teal,
              value: modoOscuro,
              onChanged: (value) {
                themeProvider.toggleTheme(value); // ✅ Actualiza el tema global
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      value
                          ? 'Modo oscuro activado 🌙'
                          : 'Modo claro activado ☀️',
                    ),
                  ),
                );
              },
            ),

            const Divider(height: 30, thickness: 1),

            // 🔠 Tamaño de letra
            Text(
              "Tamaño de letra",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: textColor,
              ),
            ),
            Slider(
              activeColor: Colors.teal,
              value: tamanoLetra,
              min: 12,
              max: 24,
              divisions: 6,
              label: "${tamanoLetra.toStringAsFixed(0)} px",
              onChanged: (value) {
                setState(() {
                  tamanoLetra = value;
                });
              },
            ),
            Text(
              "Vista previa del texto",
              style: TextStyle(fontSize: tamanoLetra, color: textColor),
            ),

            const Divider(height: 30, thickness: 1),

            // 💾 Guardar cambios
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.teal,
                padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text("Configuración guardada exitosamente ✅"),
                  ),
                );
              },
              icon: const Icon(Icons.save, color: Colors.white),
              label: const Text(
                "Guardar cambios",
                style: TextStyle(fontSize: 18, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}


