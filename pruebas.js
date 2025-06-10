// Array de pruebas, puedes añadir tantas como quieras
const pruebas = [
  {
    id: 1,
    categoria: "MTB",
    titulo: "Titan Desert",
    fecha: "10/06/2025",
    distancia: "120 km",
    altitud: "2.000 m",
    descripcion: "Una de las pruebas MTB más duras del mundo, por el desierto.",
    redes: {
      instagram: "https://instagram.com/titandesert",
      facebook: "https://facebook.com/titandesert"
    },
    web: "https://titandesert.com",
    imagen: "",
    // Otros campos...
  },
  {
    id: 2,
    categoria: "MTB",
    titulo: "La Rioja Bike Race",
    fecha: "23/05/2025",
    distancia: "85 km",
    altitud: "1.800 m",
    descripcion: "Prueba por etapas en La Rioja.",
    redes: {
      instagram: "",
      facebook: ""
    },
    web: "https://lariojabikerace.com",
    imagen: "",
  },
  {
    id: 3,
    categoria: "Carretera",
    titulo: "Gran Fondo Madrid",
    fecha: "13/07/2025",
    distancia: "160 km",
    altitud: "2.800 m",
    descripcion: "Gran fondo por la sierra madrileña.",
    redes: { instagram: "", facebook: "" },
    web: "https://granfondomadrid.com",
    imagen: "",
  },
  // ...más pruebas de todas las categorías
];

// Muestra las pruebas de una categoría en su página
function mostrarPruebasPorCategoria(cat) {
  const contenedor = document.getElementById("pruebas-lista");
  contenedor.innerHTML = '';
  // Filtra las pruebas por categoría
  const pruebasCat = pruebas.filter(p => p.categoria.toLowerCase() === cat.toLowerCase());
  if (!pruebasCat.length) {
    contenedor.innerHTML = "<p>No hay pruebas para esta categoría aún.</p>";
    return;
  }
  pruebasCat.forEach(prueba => {
    const card = document.createElement('a');
    card.className = "card prueba-card";
    card.href = `prueba.html?id=${prueba.id}`;
    card.innerHTML = `
      <h3>${prueba.titulo}</h3>
      <p><strong>Fecha:</strong> ${prueba.fecha}</p>
      <p><strong>Distancia:</strong> ${prueba.distancia}</p>
      <p><strong>Altitud:</strong> ${prueba.altitud}</p>
    `;
    contenedor.appendChild(card);
  });
}

// Para la ficha individual (ver más abajo)
function mostrarFichaPrueba() {
  // Leer id de URL
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const prueba = pruebas.find(p => p.id === id);
  const contenedor = document.getElementById("ficha-prueba");
  if (!prueba) {
    contenedor.innerHTML = "<p>Prueba no encontrada.</p>";
    return;
  }
  let redes = "";
  if (prueba.redes) {
    if (prueba.redes.instagram) redes += `<a href="${prueba.redes.instagram}" target="_blank">Instagram</a> `;
    if (prueba.redes.facebook) redes += `<a href="${prueba.redes.facebook}" target="_blank">Facebook</a> `;
  }
  contenedor.innerHTML = `
    <div class="card ficha-card">
      <h2>${prueba.titulo}</h2>
      <p><strong>Fecha:</strong> ${prueba.fecha}</p>
      <p><strong>Distancia:</strong> ${prueba.distancia}</p>
      <p><strong>Altitud:</strong> ${prueba.altitud}</p>
      <p>${prueba.descripcion || ""}</p>
      <p><strong>Redes:</strong> ${redes || 'No disponibles'}</p>
      <p><strong>Web oficial:</strong> ${prueba.web ? `<a href="${prueba.web}" target="_blank">${prueba.web}</a>` : 'No disponible'}</p>
      <a href="javascript:history.back()" class="volver-btn">← Volver</a>
    </div>
  `;
}

