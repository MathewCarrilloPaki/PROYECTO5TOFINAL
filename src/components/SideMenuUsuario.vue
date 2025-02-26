<template>
  <div>
    <!-- Mobile Menu Toggle Button -->
    <button @click="toggleMenu" class="menu-toggle" :class="{ 'active': isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Overlay for mobile -->
    <div 
      class="sidebar-overlay" 
      :class="{ 'active': isMenuOpen }" 
      @click="closeMenu"
    ></div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'active': isMenuOpen }">
      <div class="logo">
        <h1>PetSystem</h1>
      </div>

      <nav>
        <ul>
          <!-- Perfil de Usuario -->
          <li>
            <router-link to="/perfil-usuario" @click="closeMenu">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Mi Perfil
            </router-link>  
          </li>

          <!-- Mis Mascotas -->
          <li>
            <router-link to="/mis-mascotas" @click="closeMenu">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 11.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V11.5M12 5v14M8 8h8M8 12h8"/>
              </svg>
              Mis Mascotas
            </router-link>
          </li>

          <!-- Escanear Código QR -->
          <li>
            <router-link to="/escanear-qr" @click="closeMenu">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9h18M3 15h18M12 3v18M12 9h6M12 15h6M6 3v6M18 3v6M6 15v6M18 15v6"/>
              </svg>
              Escanear QR
            </router-link>
          </li>

          <!-- Cerrar Sesión -->
          <li class="logout">
            <router-link to="/login" @click="handleLogout">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Cerrar Sesión
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenuUsuario',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.closeMenu();
      this.$router.push({ name: 'login' });
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }
}
</script>

<style scoped>
/* Base styles */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background: white;
  color: #333;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.logo {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

nav {
  margin-top: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

li {
  margin: 8px 0;
}

li.logout {
  margin-top: auto;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

a,
.router-link {
  display: flex;
  align-items: center;
  padding: 12px 25px;
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

a:hover,
.router-link:hover {
  background: #f5f5f5;
  border-left: 3px solid #666;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  stroke-width: 2;
  transition: transform 0.3s ease;
}

a:hover .icon,
.router-link:hover .icon {
  transform: scale(1.1);
}

/* Mobile Menu Toggle Button */
.menu-toggle {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: #333;
  margin: 5px 0;
  transition: all 0.3s ease;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Overlay */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 999;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .menu-toggle {
    display: block;
  }

  .sidebar-overlay {
    display: block;
  }

  .sidebar-overlay.active {
    opacity: 1;
  }

  .logo {
    height: 70px;
  }

  a {
    padding: 15px 25px;
    font-size: 1.1rem;
  }

  .icon {
    width: 22px;
    height: 22px;
  }
}

/* Small screens */
@media (max-width: 480px) {
  .sidebar {
    width: 260px;
  }

  .logo h1 {
    font-size: 1.3rem;
  }

  a {
    padding: 12px 20px;
    font-size: 1rem;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}

/* Handle screen rotation */
@media screen and (orientation: landscape) and (max-height: 500px) {
  .logo {
    height: 60px;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  li {
    margin: 4px 0;
  }

  a {
    padding: 8px 20px;
  }
}
</style>
