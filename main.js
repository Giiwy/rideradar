
fetch('carreras.json')
  .then(response => response.json())
  .then(carreras => {
    const contenedor = document.getElementById('contenedor-carreras');
    carreras.forEach(carrera => {
      const tarjeta = document.createElement('div');
      tarjeta.className = 'card';
      tarjeta.innerHTML = `
        <h2>${carrera.nombre}</h2>
        <div class="info">📅 ${new Date(carrera.fecha).toLocaleDateString('es-ES')}</div>
        <div class="info">📍 ${carrera.lugar}</div>
        <div class="info">🚴 Categoría: ${carrera.categoria} · ${carrera.tipo} · ${carrera.distancia}</div>
        <div class="link"><a href="${carrera.web}" target="_blank">Ir a la web ↗</a></div>
      `;
      contenedor.appendChild(tarjeta);
    });
  })
  .catch(error => {
    console.error("Error cargando las carreras:", error);
  });
