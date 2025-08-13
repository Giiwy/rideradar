document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("eventos-container");
  if (!container) return;

  // Loading state
  container.innerHTML = `<p style="padding:1rem;background:#e7f1ff;border-left:4px solid #90c2ff;border-radius:6px;">
    Cargando eventos…
  </p>`;

  // Modalidad desde el HTML (data-modalidad="mtb" | "carretera" | "gravel" | "enduro" | "todas")
  const modalidad = (container.dataset.modalidad || "todas").toLowerCase();

  // Si tu web está en un subdirectorio (p. ej. /rideradar/ en GitHub Pages),
  // cambia la URL a "data/eventos.json" (relativa) en lugar de "/data/eventos.json" (absoluta).
  const DATA_URL = "/data/eventos.json";

  try {
    const res = await fetch(DATA_URL + `?t=${Date.now()}`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status} al cargar eventos.json`);
    const eventos = await res.json();

    // Normalizar modalidad y filtrar
    const filtrados = modalidad === "todas"
      ? eventos
      : eventos.filter(e => (e.modalidad || "").toLowerCase() === modalidad);

    if (!filtrados.length) {
      container.innerHTML = `<p>No hay eventos para <strong>${modalidad}</strong> ahora mismo.</p>`;
      return;
    }

    // Fallback por si utils.js no está cargado
    const renderEvento = (typeof window.eventoHTML === "function")
      ? window.eventoHTML
      : (e) => `
        <div class="evento ${e.modalidad || ""}">
          <h3>${e.nombre || "Evento"}</h3>
          <p><strong>Fecha:</strong> ${e.fecha || "-"}</p>
          <p>
