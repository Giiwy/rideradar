
function eventoHTML(e) {
  return `
    <div class="evento ${e.modalidad}">
      <h3>${e.nombre}</h3>
      <p><strong>Fecha:</strong> ${e.fecha}</p>
      <p><strong>Ubicación:</strong> ${e.ubicacion} (${e.provincia})</p>
      <p><strong>Desnivel:</strong> ${e.desnivel} m</p>
      <a href="detalle.html?id=${e.id}">Ver detalles</a>
    </div>
  `;
}
