<template>
    <div class="app-container">
        <!-- Menú Lateral -->
        <Menul />
        
        <!-- Contenido Principal -->
        <div class="content">
            <h2>Listado de Mascotas Registradas</h2>
            <table class="mascotas-table">
                <thead>
                    <tr>
                        <th>Nombre de la Mascota</th>
                        <th>Cédula del Propietario</th>
                        <th>Nombre del Propietario</th>
                        <th>Teléfono</th>
                        <th>Acción</th> <!-- Columna para el ícono de generar carnet -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mascota in mascotas" :key="mascota.Id">
                        <td>{{ mascota.Nombre }}</td>
                        <td>{{ mascota.Cedula }}</td>
                        <td>{{ mascota.NombrePropietario }}</td>
                        <td>{{ mascota.Telefono }}</td>
                        <td>
                            <!-- Ícono para generar el carnet -->
                            <button @click="generarCarnet(mascota)" class="btn-generar-carnet">Generar Carnet</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// El script no cambia
import Menul from '@/components/SideMenu'; // Asegúrate de que la ruta sea correcta
import { jsPDF } from "jspdf"; // Importa jsPDF

export default {
    name: "MascotasRegistradas",
    components: {
        Menul, // Asegúrate de registrar el componente
    },
    data() {
        return {
            mascotas: [],
        };
    },
    created() {
        this.fetchMascotas();
    },
    methods: {
        async fetchMascotas() {
            try {
                const response = await fetch('http://192.168.1.5:34567/api/mascotas-registradas');
                const data = await response.json();
                this.mascotas = data;
            } catch (error) {
                console.error('Error al obtener las mascotas registradas:', error);
            }
        },
        generarCarnet(mascota) {
            const doc = new jsPDF();

            // Configuración inicial
            doc.setDrawColor(0, 0, 0); // Color del borde (negro)
            doc.setLineWidth(1); // Ancho del borde

            // Rectángulo principal del carnet
            doc.rect(10, 10, 190, 100); // Tamaño del carnet

            // Encabezado del carnet
            doc.setFont("Montserrat", "normal");
            doc.setFontSize(16);
            doc.setTextColor(0, 102, 204); // Color azul
            doc.text("BORIENTIO AUTÓNOMO DESCENTINALAND", 20, 20);
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Color negro
            doc.text("INTERCULTURAL Y PLURINACIONAL DEL MUNICIPIO DE CAYAMBE", 20, 28);

            // Línea divisoria
            doc.setLineWidth(0.5);
            doc.line(20, 32, 190, 32);

            // Sección de datos de la mascota
            doc.setFontSize(12);
            doc.text(`Nombre: ${mascota.Nombre}`, 20, 40);
            doc.text(`Especie: ${mascota.Especie}`, 20, 48);
            doc.text(`Raza: ${mascota.Raza}`, 20, 56);
            doc.text(`Fecha de Nacimiento: ${mascota.FechaNacimiento}`, 20, 64);
            doc.text(`Sexo: ${mascota.Sexo}`, 20, 72);

            // Sección de datos del propietario
            doc.text(`Propietario: ${mascota.NombrePropietario}`, 100, 40);
            doc.text(`Cédula: ${mascota.Cedula}`, 100, 48);
            doc.text(`Teléfono: ${mascota.Telefono}`, 100, 56);
            doc.text(`Dirección: ${mascota.Direccion}`, 100, 64);

            // Información adicional
            doc.text(`Color: ${mascota.Color}`, 20, 90);
            doc.text(`Alimentación: ${mascota.Alimentacion}`, 20, 98);
            doc.text(`Esterilización: ${mascota.Esterilizacion}`, 100, 90);
            doc.text(`Carnet Vacuna: ${mascota.CarnetVacuna}`, 100, 98);

            // Pie de página
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100); // Color gris
            doc.text("DIRECCIÓN DE AMBIENTE - GAÚPIVO - 2021", 20, 110);

            // Guardar el PDF
            doc.save(`Carnet_Mascota_${mascota.Nombre}.pdf`);
        }
    }
};
</script>

<style scoped>
/* Importar la fuente Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

/* Contenedor principal */
.app-container {
    display: flex;
    height: 100vh;
    font-family: 'Montserrat', sans-serif; /* Usar la fuente Montserrat en toda la aplicación */
}

/* Contenido principal */
.content {
    margin-left: 250px;
    padding: 20px;
    width: 100%;
}

.mascotas-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.mascotas-table th,
.mascotas-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
}

.mascotas-table th {
    background-color: #42b983;
    color: white;
}

.mascotas-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.mascotas-table tr:hover {
    background-color: #f1f1f1;
}

/* Estilos para el botón "Generar Carnet" */
.btn-generar-carnet {
    background-color: #42b983; /* Verde similar al encabezado de la tabla */
    color: white;
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
}

.btn-generar-carnet:hover {
    background-color: #358a63; /* Un tono más oscuro del verde */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-generar-carnet:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(66, 185, 131, 0.6); /* Resalta el botón al hacer clic */
}
</style>
