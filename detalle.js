
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("detalle-evento");
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  if (!id) {
    container.innerHTML = "<p>Error: evento no encontrado.</p>";
    return;
  }

  const res = await fetch("data/eventos.json");
  const eventos = await res.json();
  const evento = eventos.find(e => e.id === id);

  if (!evento) {
    container.innerHTML = "<p>Evento no encontrado.</p>";
    return;
  }

  container.innerHTML = `
    <article class="evento ${evento.modalidad}">
      <h2>${evento.nombre}</h2>
      <p><strong>Fecha:</strong> ${evento.fecha}</p>
      <p><strong>Ubicación:</strong> ${evento.ubicacion} (${evento.provincia})</p>
      <p><strong>Desnivel:</strong> ${evento.desnivel} m</p>
      <p><strong>Modalidad:</strong> ${evento.modalidad.toUpperCase()}</p>
      <p><a href="${evento.enlace}" target="_blank">Enlace oficial</a></p>
      ${
        evento.redes?.instagram
          ? `<p><a href="${evento.redes.instagram}" target="_blank">Instagram</a></p>`
          : evento.redes?.facebook
          ? `<p><a href="${evento.redes.facebook}" target="_blank">Facebook</a></p>`
          : evento.redes?.web
          ? `<p><a href="${evento.redes.web}" target="_blank">Web</a></p>`
          : ""
      }
    </article>
  `;
});
