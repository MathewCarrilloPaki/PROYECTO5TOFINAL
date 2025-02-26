<template>
    <div>
      <!-- Menú lateral -->
      <SideMenuUsuario @menu-toggle="handleMenuToggle" />
  
      <!-- Contenido principal -->
      <div class="mismascotas" :class="{ 'menu-collapsed': !isMenuOpen }">
        <div class="mascotas-container">
          <h1>Mis Mascotas</h1>
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <span>Cargando...</span>
          </div>
          <div v-else class="mascotas-list">
            <div v-for="mascota in mascotas" :key="mascota.Id" class="mascota-card">
              <div class="mascota-avatar">
                <img :src="mascota.Imagen || '/ruta/a/imagen/por/defecto.jpg'" alt="Mascota" />
              </div>
              <div class="mascota-info">
                <h2>{{ mascota.Nombre }}</h2>
                <p><strong>Especie:</strong> {{ mascota.Especie }}</p>
                <p><strong>Raza:</strong> {{ mascota.Raza }}</p>
                <p><strong>Color:</strong> {{ mascota.Color }}</p>
                <p><strong>Sexo:</strong> {{ mascota.Sexo === 'M' ? 'Masculino' : 'Femenino' }}</p>
                <p><strong>Fecha de Nacimiento:</strong> {{ mascota.FechaNacimiento }}</p>
                <p><strong>Descripción:</strong> {{ mascota.Descripcion }}</p>
                <p><strong>Alimento:</strong> {{ mascota.Alimento }}</p>
                <p><strong>Tenencia:</strong> {{ mascota.Tenencia }}</p>
                <p><strong>Reproductivo:</strong> {{ mascota.Reproductivo ? 'Sí' : 'No' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  import SideMenuUsuario from '@/components/SideMenuUsuario.vue';
  
  export default {
    name: 'MisMascotas', // Asegúrate de que el nombre sea de múltiples palabras
    components: {
      SideMenuUsuario,
    },
    data() {
      return {
        mascotas: [],
        loading: true,
        isMenuOpen: true,
      };
    },
    async created() {
      await this.obtenerMascotas();
    },
    methods: {
      handleMenuToggle(isOpen) {
        this.isMenuOpen = isOpen;
      },
      async obtenerMascotas() {
        try {
          const usuarioId = Cookies.get('UsuarioId');
          const response = await fetch(`http://192.168.1.5:34567/api/mascotas?usuarioId=${usuarioId}`);
          if (response.ok) {
            const data = await response.json();
            this.mascotas = data;
          } else {
            alert('Error al obtener las mascotas.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error de conexión con el servidor.');
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .mismascotas {
    margin-left: 250px;
    padding: 2rem;
    min-height: 100vh;
    transition: margin-left 0.3s ease;
    background: #f8f9fa;
  }
  
  .mismascotas.menu-collapsed {
    margin-left: 0;
  }
  
  .mascotas-container {
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .mascotas-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .mascota-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .mascota-card:hover {
    transform: translateY(-5px);
  }
  
  .mascota-avatar img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
  
  .mascota-info {
    margin-top: 1rem;
    text-align: center;
  }
  
  .mascota-info h2 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .mascota-info p {
    color: #666;
    font-size: 1rem;
    margin: 0.5rem 0;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #42b983;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .mismascotas {
      margin-left: 0;
      padding: 1rem;
    }
  
    .mascotas-container {
      padding: 1.5rem;
    }
  
    h1 {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
    }
  
    .mascotas-list {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
  </style>
  