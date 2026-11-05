<template>
  <div class="vue-widget p-4 mb-4 rounded shadow-sm bg-white border-start border-success border-4">
    <h3 class="text-success mb-3">Panel Interactivo (Módulo Vue)</h3>
    
    <div class="row g-3">
      <!-- 1. Panel de Estadísticas (Dinámico) -->
      <div class="col-md-6">
        <div class="p-3 bg-light rounded text-center">
          <h5 class="text-muted">Total en Catálogo</h5>
          <span class="display-6 fw-bold text-dark">{{ totalLenguajes }}</span>
        </div>
      </div>

      <!-- 3. Banner de Lenguaje Destacado (Dinámico) -->
      <div class="col-md-6">
        <div class="p-3 bg-success text-white rounded">
          <h5 class="mb-1">⭐ Lenguaje Destacado</h5>
          <p class="mb-0 fw-bold fs-5">{{ lenguajeDestacado.nombre }}</p>
          <small>{{ lenguajeDestacado.descripcion }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuloVue',
  data() {
    return {
      totalLenguajes: 0,
      lenguajeDestacado: {
        nombre: 'Cargando...',
        descripcion: 'Espere un momento...'
      }
    }
  },
  mounted() {
    fetch('http://localhost:3001/api/datos')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          this.totalLenguajes = data.length;
          const ultimo = data[data.length - 1];
          this.lenguajeDestacado = {
            nombre: ultimo.nombre,
            descripcion: ultimo.descripcion || 'Registrado en la base de datos.'
          };
        }
      })
      .catch((err) => console.error('Error al cargar datos en Vue:', err));
  }
}
</script>

<style scoped>
.vue-widget {
  transition: all 0.3s ease;
}
</style>