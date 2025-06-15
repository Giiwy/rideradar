let datosCarreras = [];
let ordenAscendente = true; // Estado para el botón de orden

const urlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQge-qUgk3U5--ECcmHxmRutJ5DQ5eg66L9LfU-oS2HZRsKsw_2sPU5Ix5ZaC1qXqN2ZISUpS9weH1a/pub?gid=0&single=true&output=csv';

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

const ordenarYMostrar = () => {
  const copia = [...datosCarreras];

  copia.sort((a, b) => {
    const fechaA = new Date(a.Fecha || '2100-01-01');
    const fechaB = new Date(b.Fecha || '2100-01-01');
    return ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
  });

  renderizarTabla(copia);
};

const cargarCSVdesdeGSheets = async () => {
  try {
    const respuesta = await fetch(urlCSV);
    if (!respuesta.ok) throw new Error('No se pudo obtener el CSV');

    const texto = await respuesta.text();
    const lineas = texto.trim().split('\n');
    const cabeceras = lineas[0].split(',');

    const datos = lineas.slice(1).map(linea => {
      const valores = linea.split(',');
      const obj = {};
      cabeceras.forEach((cab, i) => {
        obj[cab.trim()] = valores[i] ? valores[i].trim() : "";
      });
      return obj;
    });

    datosCarreras = datos;
    ordenarYMostrar();

  } catch (err) {
    console.error('Error cargando las carreras:', err);
    document.getElementById('contenedor-carreras').innerText = '⚠️ Error cargando los datos.';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  cargarCSVdesdeGSheets();

  // Añadir el comportamiento del botón de orden
  const botonOrden = document.getElementById('boton-orden-fecha');
  if (botonOrden) {
    botonOrden.addEventListener('click', () => {
      ordenAscendente = !ordenAscendente;
      botonOrden.innerText = ordenAscendente
        ? "Ordenar por fecha (ascendente)"
        : "Ordenar por fecha (descendente)";
      ordenarYMostrar();
    });
  }
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
