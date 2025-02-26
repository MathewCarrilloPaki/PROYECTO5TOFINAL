<template>
  <div>
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo">
        <h1>PetSystem</h1>
      </div>

      <nav>
        <ul>
          <li>
            <a href="/home">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/register-user">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M20 8v6M17 11h6"/>
              </svg>
              Registrar Usuario
            </a>
          </li>
          <li>
            <a href="/register-mascota">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19 12c0-3.5-3.5-7-7-7s-7 3.5-7 7 3.5 7 7 7 7-3.5 7-7z"/>
                <path d="M12 5v2M12 19v-2M5 12H3M21 12h-2"/>
              </svg>
              Registrar Mascota
            </a>
          </li>
          <li>
            <a href="/mascotas-registradas">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
              Carnet de Mascotas
            </a>
          </li>
          <li>
            <a href="/users">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Usuarios
            </a>
          </li>
          <li class="logout">
            <a href="/LoginView">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Cerrar Sesión
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu'
}
</script>

<style scoped>
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
}

.logo {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
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

a {
  display: flex;
  align-items: center;
  padding: 12px 25px;
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

a:hover {
  background: #f5f5f5;
  border-left: 3px solid #666;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  stroke-width: 2;
}

a:hover .icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .sidebar {
    width: 240px;
  }
}
</style>