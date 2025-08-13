
function eventoHTML(e) {
  return `
    <div class="evento ${e.modalidad}">
      <h3>${e.nombre}</h3>
      <p><strong>Fecha:</strong> ${e.fecha}</p>
      <p><strong>Ubicación:</strong> ${e.ubicacion} (${e.provincia})</p>
      <p><strong>Desnivel:</strong> ${e.desnivel} m</p>
      <a href="${e.enlace}" target="_blank">Más info</a>
    </div>
  `;
}
