let datosCarreras = [];

const normalizar = (valor) => {
  return (valor && valor.trim() !== "" && valor.trim() !== "-" && valor.trim() !== "") 
    ? valor.replaceAll("?", "").trim() 
    : "No disponible";
};

const renderizarTabla = (datos) => {
  const contenedor = document.getElementById('contenedor-carreras');
  contenedor.innerHTML = "";

  const tabla = document.createElement('table');
  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Modalidad</th>
        <th>Fecha</th>
        <th>Ubicación</th>
        <th>Distancia</th>
        <th>Desnivel</th>
        <th>Web</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const cuerpo = tabla.querySelector('tbody');

  datos.forEach(carrera => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${normalizar(carrera.Nombre)}</td>
      <td>${normalizar(carrera.Tipo)}</td>
      <td>${normalizar(carrera.Modalidad)}</td>
      <td>${normalizar(carrera.Fecha)}</td>
      <td>${normalizar(carrera.Ubicación)}</td>
      <td>${normalizar(carrera.Distancia)}</td>
      <td>${normalizar(carrera.Desnivel)}</td>
      <td>${normalizar(carrera.Web) !== "No disponible" 
        ? `<a href="${normalizar(carrera.Web)}" target="_blank">Enlace</a>` 
        : "No disponible"}</td>
    `;
    cuerpo.appendChild(fila);
  });

  contenedor.appendChild(tabla);
};

fetch('/carreras.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar el JSON');
    return res.json();
  })
  .then(data => {
    datosCarreras = data;
    renderizarTabla(datosCarreras);
  })
  .catch(err => {
    console.error('Error cargando las carreras:', err);
    document.getElementById('contenedor-carreras').innerText = '⚠️ Error cargando los datos.';
  });

document.addEventListener('input', () => {
  const texto = document.getElementById('buscador').value.toLowerCase();
  const modalidad = document.getElementById('filtro-modalidad').value;

  const filtrado = datosCarreras.filter(carrera => {
    const coincideTexto = (
      normalizar(carrera.Nombre).toLowerCase().includes(texto) ||
      normalizar(carrera.Ubicación).toLowerCase().includes(texto)
    );
    const coincideModalidad = modalidad === "" || normalizar(carrera.Modalidad) === modalidad;
    return coincideTexto && coincideModalidad;
  });

  renderizarTabla(filtrado);
});
