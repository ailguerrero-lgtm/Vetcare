import 'package:flutter/material.dart';
import 'package:vetcare/src/Nabar.dart';

class HardwarePage extends StatelessWidget {
  const HardwarePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text("Recursos QR moviles"),
        backgroundColor: Colors.cyan,
        foregroundColor: Colors.white,
      ),
      body: const Center(
        child: Text(
          "Codigo QR funcionando correctamente 📱",
          style: TextStyle(fontSize: 22),
        ),
      ),
    );
  }
}
