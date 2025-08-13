document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("eventos-container");
  const modalidad = container?.dataset?.modalidad || "todas";

  try {
    const res = await fetch("/data/eventos.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status} al cargar eventos.json`);
    const eventos = await res.json();

    const filtrados = modalidad === "todas"
      ? eventos
      : eventos.filter(e => (e.modalidad || "").toLowerCase() === modalidad);

    if (!filtrados.length) {
      container.innerHTML = `<p>No hay eventos para <strong>${modalidad}</strong> ahora mismo.</p>`;
      return;
    }

    container.innerHTML = filtrados.map(eventoHTML).join("");
  } catch (err) {
    console.error(err);
    if (container) {
      container.innerHTML = `
        <p style="padding:1rem;background:#fff3cd;border-left:4px solid #ffec99;border-radius:6px;">
          No se pudieron cargar los eventos. Revisa que <code>/data/eventos.json</code> exista y sea válido.
        </p>
      `;
    }
  }
});
