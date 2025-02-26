import { createApp } from 'vue'; // Para Vue 3
import App from './App.vue';
import router from './router'; // Asegúrate de importar el router correctamente

createApp(App).use(router).mount('#app'); // Usa el router
