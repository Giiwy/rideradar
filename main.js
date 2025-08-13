
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("eventos-container");
  const modalidad = container.dataset.modalidad;
  const res = await fetch("data/eventos.json");
  const eventos = await res.json();

  const filtrados = modalidad === "todas"
    ? eventos
    : eventos.filter(e => e.modalidad === modalidad);

  container.innerHTML = filtrados.map(eventoHTML).join("");
});
