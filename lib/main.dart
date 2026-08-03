// ** INICIALIZACIÓN DE FIREBASE **
import 'package:firebase_core/firebase_core.dart';
import 'package:vetcare/firebase_options.dart';
// ** FIN DE INICIALIZACIÓN DE FIREBASE **

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vetcare/lib/theme_provider.dart'; // ✅ Ruta corregida
import 'package:vetcare/src/Nabar.dart';
import 'package:vetcare/src/pantallas/hardware_page.dart';
import 'package:vetcare/src/pantallas/login_page.dart';
import 'package:vetcare/src/pantallas/registro_page.dart';
import 'package:vetcare/src/pantallas/recuperar_contrasena_page.dart';
import 'package:vetcare/src/registro_mascota.dart';
import 'package:vetcare/src/lista_mascotas.dart';
import 'package:vetcare/src/vacunas_citas.dart';
import 'package:vetcare/src/propietarios.dart';
import 'package:vetcare/src/configuracion.dart';

// ** FUNCIÓN main() MODIFICADA PARA FIREBASE **
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  runApp(
    ChangeNotifierProvider(
      create: (context) => ThemeProvider(),
      child: const MyApp(),
    ),
  );
}
// ** FIN DE main() MODIFICADA **

// 🏠 **HomePage con DISEÑO A**
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text("VetCare - Inicio"),
        backgroundColor: const Color.fromARGB(255, 23, 204, 236),
        foregroundColor: Colors.white,
      ),
      body: Container(
        width: double.infinity,
        height: double.infinity,
        padding: const EdgeInsets.all(30),
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFFE3F9FF), Color(0xFFF5FBFF)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),

        child: LayoutBuilder(
          builder: (context, constraints) {
            final isLargeScreen = constraints.maxWidth > 800;

            return isLargeScreen
                ? Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // ================================
                      //  SECCIÓN DE TEXTO A LA IZQUIERDA
                      // ================================
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.only(right: 40),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text(
                                "¿Por qué utilizar VetCare?",
                                style: TextStyle(
                                  fontSize: 32,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.teal,
                                ),
                              ),
                              SizedBox(height: 20),
                              Text(
                                "VetCare proporciona una plataforma moderna y confiable para la gestión "
                                "de mascotas, permitiendo almacenar información médica, registros de "
                                "vacunas, citas y datos del propietario. Ofrecemos una experiencia fácil, "
                                "rápida y segura para que siempre tengas el control del bienestar de tus "
                                "mascotas.\n\n"
                                "VetCare está diseñado para clínicas veterinarias y usuarios que desean "
                                "organizar y cuidar mejor a sus animales, asegurando que toda la información "
                                "esté disponible cuando más la necesites.",
                                style: TextStyle(
                                  fontSize: 18,
                                  height: 1.4,
                                  color: Colors.black87,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      // ================================
                      //  TARJETA A LA DERECHA (YA EXISTENTE)
                      // ================================
                      _buildWelcomeCard(isDarkMode),
                    ],
                  )
                : Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const SizedBox(height: 20),
                      const Text(
                        "¿Por qué utilizar VetCare?",
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Colors.teal,
                        ),
                      ),
                      const SizedBox(height: 20),
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 15),
                        child: Text(
                          "VetCare proporciona una plataforma moderna y confiable para la gestión "
                          "de mascotas, permitiendo almacenar información médica, registros de "
                          "vacunas, citas y datos del propietario.\n\n"
                          "Ofrecemos una experiencia fácil, rápida y segura para que siempre "
                          "tengas el control del bienestar de tus mascotas.",
                          style: TextStyle(
                            fontSize: 17,
                            height: 1.4,
                            color: Colors.black87,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      const SizedBox(height: 30),
                      _buildWelcomeCard(isDarkMode),
                    ],
                  );
          },
        ),
      ),
    );
  }

  // =====================================
  //  TARJETA ELEGANTE (ya existente)
  // =====================================
  Widget _buildWelcomeCard(bool isDarkMode) {
    return Container(
      width: 380,
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: isDarkMode ? Colors.black26 : Colors.white,
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.15),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Image.asset('assets/images/logo.png', width: 180),
          const SizedBox(height: 20),
          const Text(
            "Bienvenidos a VetCare",
            style: TextStyle(
              fontSize: 24,
              color: Colors.teal,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            "Más que una app, una familia 🐾",
            style: TextStyle(
              fontSize: 16,
              color: isDarkMode ? Colors.white70 : Colors.black54,
            ),
          ),
        ],
      ),
    );
  }
}

//  Clase principal de la App
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'VetCare - App Demo',
      themeMode: themeProvider.isDarkMode ? ThemeMode.dark : ThemeMode.light,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
        brightness: Brightness.light,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.blueGrey,
        useMaterial3: true,
      ),
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginPage(),
        '/registro': (context) => const RegistroPage(),
        '/recuperar': (context) => const RecuperarContrasenaPage(),
        '/': (context) => const HomePage(),
        '/pageOne': (context) => const PageOne(),
        '/pageTwo': (context) => const PageTwo(),
        '/pageThree': (context) => const PageThree(),
        '/registroMascota': (context) => const RegistroMascotaPage(),
        '/listaMascotas': (context) => const ListaMascotasPage(),
        '/vacunasCitas': (context) => const VacunasCitasPage(),
        '/propietarios': (context) => const PropietariosPage(),
        '/configuracion': (context) => const ConfiguracionPage(),
        '/hardware': (context) => const HardwarePage(),
      },
    );
  }
}

// 📄 Páginas de ejemplo (sin cambios)
class PageOne extends StatelessWidget {
  const PageOne({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text("Página 1"),
        backgroundColor: Colors.blueAccent,
        foregroundColor: Colors.white,
      ),
      body: const Center(
        child: Text(
          "¡Bienvenido a la Página Uno!",
          style: TextStyle(fontSize: 24, color: Colors.blueAccent),
        ),
      ),
    );
  }
}

class PageTwo extends StatelessWidget {
  const PageTwo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text("Página 2"),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: const Center(
        child: Text(
          "¡Bienvenido a la Página Dos!",
          style: TextStyle(fontSize: 24, color: Colors.deepPurple),
        ),
      ),
    );
  }
}

class PageThree extends StatelessWidget {
  const PageThree({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Nabar(),
      appBar: AppBar(
        title: const Text("Página 3"),
        backgroundColor: Colors.pink,
        foregroundColor: Colors.white,
      ),
      body: const Center(
        child: Text(
          "¡Bienvenido a la Página Tres!",
          style: TextStyle(fontSize: 24, color: Colors.pink),
        ),
      ),
    );
  }
}
