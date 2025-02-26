import { createRouter, createWebHistory } from 'vue-router'; // Importa desde vue-router
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import RegisterUser from './views/RegisterUser.vue'; // Importa el componente RegisterUser
import SideMenu from './components/SideMenu.vue'; // Importa el menú lateral
import MascotaRegister from './views/MascotaRegister.vue'; // Importa el componente MascotaRegister
import MascotasRegistradas from './views/MascotasRegistradas.vue'; // Importa la nueva vista MascotasRegistradas
import PerfilUsuario from './views/perfilUsuario.vue'; // Importa el nuevo componente PerfilUsuario
import MisMascotas from './views/Mismascotas.vue'; // Nueva vista para Mis Mascotas
import EscanearQR from './views/EscanearQR.vue'; // Importa el componente EscanearQR

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    components: {
      default: HomeView,
      sideMenu: SideMenu, // Menú lateral para la ruta de Home
    },
  },
  {
    path: '/register-user', // Ruta para el registro de usuarios
    name: 'register-user',
    components: {
      default: RegisterUser, // Componente principal
      sideMenu: SideMenu, // Menú lateral para la ruta de registro
    },
  },
  {
    path: '/register-mascota', // Nueva ruta para el registro de la mascota
    name: 'register-mascota',
    components: {
      default: MascotaRegister, // Componente MascotaRegister
      sideMenu: SideMenu, // Menú lateral para la ruta de registro de mascota
    },
  },
  {
    path: '/mascotas-registradas', // Nueva ruta para las mascotas registradas
    name: 'mascotas-registradas',
    components: {
      default: MascotasRegistradas, // Componente MascotasRegistradas
      sideMenu: SideMenu, // Menú lateral para la ruta de mascotas registradas
    },
  },
  {
    path: '/perfil-usuario', // Nueva ruta para el perfil del usuario
    name: 'perfil-usuario',
    components: {
      default: PerfilUsuario, // Componente PerfilUsuario
      sideMenu: SideMenu, // Menú lateral para la ruta de perfil de usuario
    },
  },
  {
    path: '/mis-mascotas', // Nueva ruta para Mis Mascotas
    name: 'mis-mascotas',
    components: {
      default: MisMascotas, // Componente MisMascotas
      sideMenu: SideMenu, // Menú lateral para la ruta de Mis Mascotas
    },
  },
  {
    path: '/escanear-qr', // Nueva ruta para Escanear QR
    name: 'escanear-qr',
    components: {
      default: EscanearQR, // Componente EscanearQR
      sideMenu: SideMenu, // Menú lateral para la ruta de escanear QR
    },
  },
];

const router = createRouter({
  history: createWebHistory(), // Usamos createWebHistory para manejar el historial en el navegador
  routes, // Define las rutas
});

export default router;
