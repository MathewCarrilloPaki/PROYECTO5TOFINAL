<template>
  <div class="container">
    <nav class="navbar">
      <img :src="logo" alt="Logo" class="logo" />
    </nav>
    <div class="content">
      <div class="form-section">
        <h1 class="title">MASCOTAS</h1>
        <p class="welcome-text">Bienvenidos al registro de mascotas del municipio de Cayambe</p>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">USUARIO</label>
            <input type="text" id="username" v-model="username" placeholder="Ingresa tu usuario" required />
          </div>
          <div class="input-group">
            <label for="password">CONTRASEÑA</label>
            <input type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña" required />
          </div>
          <button type="submit" :disabled="loading" class="login-btn">
            {{ loading ? 'Cargando...' : 'INICIAR SESIÓN' }}
          </button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <div class="download-links">
          <a href="#" class="download-btn">
            <img :src="googlePlay" alt="Descargar en Google Play" class="download-icon" />
          </a>
          <a href="#" class="download-btn">
            <img :src="appStore" alt="Descargar en App Store" class="download-icon" />
          </a>
        </div>

      </div>
      <div class="image-section">
        <img :src="mascotasLogo" alt="Imagen de mascotas" class="side-image" />
      </div>
    </div>
  </div>
</template>
<script>
import mascotasLogo from '/src/imagenes/logoMascotas.png';
import logo from '/src/imagenes/escudo.png';
import googlePlay from '/src/imagenes/playstore.png';
import appStore from '/src/imagenes/appstore.png';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      errorMessage: '',
      mascotasLogo,
      logo,
      googlePlay,
      appStore,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';
      
      if (this.username === 'admin' && this.password === 'admin') {
        console.log('Inicio de sesión como administrador');
        window.location.href = 'http://192.168.1.5:34568/home';
        this.loading = false;
        return;
      }
      
      try {
        const response = await fetch('http://192.168.1.5:34567/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('usuarioId', data.usuario.id);
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
          
          console.log(`Inicio de sesión exitoso. Usuario ID: ${data.usuario.id}, Nombre: ${data.usuario.nombre}`);
          
          this.$router.push({ name: 'perfil-usuario' });
        } else {
          this.errorMessage = data.error || 'Usuario o contraseña incorrectos';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Error de conexión con el servidor';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  animation: fadeIn 1s ease-in-out;
  padding: 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.navbar {
  width: 100%;
  padding: 0.8rem;
  display: flex;
  justify-content: center;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.logo {
  height: 40px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.content {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 1000px;
  gap: 2rem;
  animation: slideIn 1s ease-in-out;
  flex-wrap: wrap;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.form-section {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 300px;
  max-width: 450px;
  text-align: center;
  transition: transform 0.3s ease;
}

.form-section:hover {
  transform: translateY(-3px);
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  max-width: 450px;
}

.side-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.title {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.welcome-text {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.download-links {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.download-icon {
  width: 120px;
  height: auto;
  transition: transform 0.3s ease;
}

.download-icon:hover {
  transform: scale(1.05);
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  font-size: 0.9rem;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-10px);
  }

  50% {
    transform: translateX(10px);
  }

  75% {
    transform: translateX(-10px);
  }
}

.login-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  max-width: 300px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
}

.login-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-group input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .form-section,
  .image-section {
    width: 100%;
    max-width: 100%;
  }

  .side-image {
    max-width: 300px;
  }

  .title {
    font-size: 1.75rem;
  }

  .welcome-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem;
  }

  .form-section {
    padding: 1.5rem;
  }

  .side-image {
    max-width: 250px;
  }

  .download-icon {
    width: 100px;
  }
}
</style>