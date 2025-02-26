<template>
    <div class="register-user">
        <menul />
        <div class="content">
            <header>
                <h1>Registrar Mascota</h1>
            </header>
            <!-- Formulario de búsqueda de usuario por cédula -->
            <div class="search-container">
                <input v-model="cedulaBusqueda" type="text" placeholder="Buscar usuario por cédula..."
                    @input="buscarUsuario" class="search-input" />
                <div v-if="usuariosEncontrados.length > 0" class="usuario-result">
                    <ul>
                        <li v-for="(usuario, index) in usuariosEncontrados" :key="index"
                            @click="seleccionarUsuario(usuario)">
                            {{ usuario.Nombre }} {{ usuario.Apellido }} - Cédula: {{ usuario.Cedula }}
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Formulario para registrar mascota y vacunas -->
            <div v-if="mostrarFormulario" class="mascota-form">
                <h2>Registrar Mascota</h2>
                <form @submit.prevent="registrarMascota">
                    <label for="nombre">Nombre de la mascota:</label>
                    <input v-model="mascota.nombre" type="text" id="nombre" required />

                    <label for="color">Color:</label>
                    <input v-model="mascota.color" type="text" id="color" />

                    <label for="especie">Especie:</label>
                    <input v-model="mascota.especie" type="text" id="especie" />

                    <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                    <input v-model="mascota.fechaNacimiento" type="date" id="fechaNacimiento" />

                    <label for="sexo">Sexo:</label>
                    <select v-model="mascota.sexo" id="sexo">
                        <option value="M">Macho</option>
                        <option value="F">Hembra</option>
                    </select>

                    <label for="raza">Raza:</label>
                    <input v-model="mascota.raza" type="text" id="raza" />

                    <label for="descripcion">Descripción:</label>
                    <textarea v-model="mascota.descripcion" id="descripcion"></textarea>

                    <label for="habitat">Hábitat:</label>
                    <input v-model="mascota.habitat" type="text" id="habitat" />

                    <label for="alimento">Alimento:</label>
                    <input v-model="mascota.alimento" type="text" id="alimento" />

                    <label for="otroAlimento">Otro Alimento:</label>
                    <input v-model="mascota.otroAlimento" type="text" id="otroAlimento" />

                    <label for="obtencion">Obtención:</label>
                    <input v-model="mascota.obtencion" type="text" id="obtencion" />

                    <label for="tenencia">Tenencia:</label>
                    <input v-model="mascota.tenencia" type="text" id="tenencia" />

                    <label for="reproductivo">Reproductivo:</label>
                    <select v-model="mascota.reproductivo" id="reproductivo">
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                    </select>

                    <label for="imagen">Imagen:</label>
                    <input v-model="mascota.imagen" type="text" id="imagen" />

                    <h3>Vacunas</h3>
                    <div class="vacunas-container">
                        <input v-model="vacuna.nombre" type="text" placeholder="Nombre de la vacuna" />
                        <input v-model="vacuna.fechaAplicacion" type="date" placeholder="Fecha de aplicación" />
                        <textarea v-model="vacuna.descripcion" placeholder="Descripción (opcional)"></textarea>
                        <button type="button" @click="agregarVacuna">Agregar Vacuna</button>
                        <ul>
                            <li v-for="(vacuna, index) in vacunas" :key="index">
                                {{ vacuna.nombre }} - {{ vacuna.fechaAplicacion }}
                            </li>
                        </ul>
                    </div>

                    <button type="submit">Guardar Mascota y Vacunas</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
import Menul from '@/components/SideMenu';
export default {
    components: {
    Menul
},
    data() {
        return {
            cedulaBusqueda: "",
            usuariosEncontrados: [],
            usuarioSeleccionado: null,
            mostrarFormulario: false,
            timeoutId: null,
            mascota: {
                nombre: "",
                color: "",
                especie: "",
                fechaNacimiento: "",
                sexo: "M",
                descripcion: "",
                raza: "",
                habitat: "",
                alimento: "",
                otroAlimento: "",
                obtencion: "",
                tenencia: "",
                reproductivo: "0",
                imagen: "",
                usuarioId: null,
                vacunas: []
            },
            vacuna: {
                nombre: "",
                fechaAplicacion: "",
                descripcion: ""
            },
            vacunas: []
        };
    },
    methods: {
        debounceSearch(func, wait) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => func(), wait);
        },

        handleInput() {
            this.debounceSearch(() => this.buscarUsuario(), 300);
        },

        async buscarUsuario() {
            if (this.cedulaBusqueda.trim().length > 0) {
                try {
                    const response = await fetch(`http://192.168.1.5:34567/api/usuarios/${this.cedulaBusqueda.trim()}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    this.usuariosEncontrados = Array.isArray(data) ? data : [data];
                } catch (error) {
                    console.error("Error al buscar el usuario:", error);
                    this.usuariosEncontrados = [];
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al buscar el usuario',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            } else {
                this.usuariosEncontrados = [];
            }
        },

        seleccionarUsuario(usuario) {
            this.usuarioSeleccionado = usuario;
            this.mascota.usuarioId = usuario.Id;
            this.cedulaBusqueda = `${usuario.Nombre} ${usuario.Apellido}`;
            this.usuariosEncontrados = [];
            this.mostrarFormulario = true;
        },

        validarFormularioMascota() {
            const camposRequeridos = ['nombre', 'especie', 'fechaNacimiento', 'sexo'];
            for (const campo of camposRequeridos) {
                if (!this.mascota[campo]) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campos incompletos',
                        text: 'Por favor complete todos los campos requeridos',
                        confirmButtonColor: '#3085d6'
                    });
                    return false;
                }
            }
            return true;
        },

        async registrarMascota() {
            if (!this.validarFormularioMascota()) return;

            try {
                Swal.fire({
                    title: 'Guardando...',
                    text: 'Por favor espere mientras se registra la información',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const mascotaData = {
                    ...this.mascota,
                    usuarioId: this.usuarioSeleccionado.Id,
                    vacunas: this.vacunas
                };

                const response = await fetch("http://192.168.1.5:34567/api/registrar-mascota", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(mascotaData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.mascotaId) {
                    await Swal.fire({
                        icon: 'success',
                        title: '¡Registro exitoso!',
                        text: 'La mascota y sus vacunas han sido registradas correctamente',
                        confirmButtonColor: '#3085d6'
                    });
                    this.resetFormulario();
                    this.mostrarFormulario = false;
                } else {
                    throw new Error('No se recibió el ID de la mascota');
                }
            } catch (error) {
                console.error("Error al registrar la mascota:", error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar la mascota y sus vacunas',
                    confirmButtonColor: '#d33'
                });
            }
        },

        validarFormularioVacuna() {
            if (!this.vacuna.nombre || !this.vacuna.fechaAplicacion) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Por favor complete el nombre y la fecha de la vacuna',
                    confirmButtonColor: '#3085d6'
                });
                return false;
            }
            return true;
        },

        agregarVacuna() {
            if (!this.validarFormularioVacuna()) return;

            this.vacunas.push({ ...this.vacuna });
            this.vacuna = {
                nombre: "",
                fechaAplicacion: "",
                descripcion: ""
            };

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Vacuna agregada',
                showConfirmButton: false,
                timer: 1500
            });
        },

        eliminarVacuna(index) {
            Swal.fire({
                title: '¿Está seguro?',
                text: "No podrá revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.vacunas.splice(index, 1);
                    Swal.fire(
                        '¡Eliminada!',
                        'La vacuna ha sido eliminada.',
                        'success'
                    );
                }
            });
        },

        resetFormulario() {
            this.mascota = {
                nombre: "",
                color: "",
                especie: "",
                fechaNacimiento: "",
                sexo: "M",
                descripcion: "",
                raza: "",
                habitat: "",
                alimento: "",
                otroAlimento: "",
                obtencion: "",
                tenencia: "",
                reproductivo: "0",
                imagen: "",
                usuarioId: null,
                vacunas: []
            };
            this.vacuna = {
                nombre: "",
                fechaAplicacion: "",
                descripcion: ""
            };
            this.vacunas = [];
        }
    },

    beforeUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

/* Estilo general */
body {
    font-family: 'Montserrat', sans-serif;
    background-color: #f4f7fc;
    margin: 0;
    padding: 0;
}
.content {
    margin-left: 250px; /* Igual al ancho del menú lateral */
    padding: 20px; /* Espacio interno para que no se pegue al menú */
}
.search-container {
    margin-bottom: 20px;
    position: relative;
}

.search-input {
    padding: 12px 15px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
    background-color: #ffffff;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: #42b983;
    outline: none;
}

.usuario-result {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 10px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
}

.usuario-result ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.usuario-result li {
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.usuario-result li:hover {
    background-color: #42b983;
    color: white;
}

.add-pet-btn {
    background-color: #42b983;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.add-pet-btn:hover {
    background-color: #36976b;
}

/* Estilos del formulario de mascota */
.mascota-form {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.mascota-form h2 {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 24px;
}

.mascota-form input,
.mascota-form select,
.mascota-form textarea {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.mascota-form input:focus,
.mascota-form select:focus,
.mascota-form textarea:focus {
    border-color: #42b983;
    outline: none;
}

.mascota-form button {
    background-color: #42b983;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    width: 100%;
    margin-top: 20px;
}

.mascota-form button:hover {
    background-color: #36976b;
}

/* Estilos de las vacunas */
.vacunas-container {
    margin-top: 20px;
}

.add-vaccine-btn {
    background-color: #42b983;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.add-vaccine-btn:hover {
    background-color: #36976b;
}

.vacunas-container ul {
    margin-top: 20px;
}

.vacunas-container li {
    list-style-type: none;
    margin: 10px 0;
    font-size: 16px;
}

.vacunas-container li::before {
    content: "✔️";
    margin-right: 10px;
    color: #42b983;
}

.vacunas-container button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.vacunas-container button:hover {
    background-color: #d32f2f;
}

</style>
