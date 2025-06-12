fetch('/carreras.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar el JSON');
    return res.json();
  })
  .then(data => {
    const contenedor = document.getElementById('contenedor-carreras');
    contenedor.innerHTML = ""; // Limpiar si ya había contenido

    data.forEach(carrera => {
      const normalizar = (valor) => {
        return (valor && valor.trim() !== "" && valor.trim() !== "-" && valor.trim() !== "") 
          ? valor.replaceAll("?", "").trim() 
          : "No disponible";
      };

      const div = document.createElement('div');
      div.className = 'carrera';
      div.innerHTML = `
        <h2>${normalizar(carrera.Nombre)}</h2>
        <p><strong>Tipo:</strong> ${normalizar(carrera.Tipo)}</p>
        <p><strong>Modalidad:</strong> ${normalizar(carrera.Modalidad)}</p>
        <p><strong>Fecha:</strong> ${normalizar(carrera.Fecha)}</p>
        <p><strong>Ubicación:</strong> ${normalizar(carrera.Ubicación)}</p>
        <p><strong>Distancia:</strong> ${normalizar(carrera.Distancia)}</p>
        <p><strong>Desnivel:</strong> ${normalizar(carrera.Desnivel)}</p>
        <p><strong>Web:</strong> ${normalizar(carrera.Web) !== "No disponible" 
          ? `<a href="${carrera.Web}" target="_blank">${normalizar(carrerfetch('/carreras.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar el JSON');
    return res.json();
  })
  .then(data => {
    const contenedor = document.getElementById('contenedor-carreras');
    contenedor.innerHTML = ""; // Limpiar contenido anterior

    // Crear la tabla y encabezado
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

    const normalizar = (valor) => {
      return (valor && valor.trim() !== "" && valor.trim() !== "-" && valor.trim() !== "") 
        ? valor.replaceAll("?", "").trim() 
        : "No disponible";
    };

    // Agregar filas de datos
    data.forEach(carrera => {
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
  })
  .catch(err => {
    console.error('Error cargando las carreras:', err);
    document.getElementById('contenedor-carreras').innerText = '⚠️ Error cargando los datos.';
  });

    console.error('Error cargando las carreras:', err);
    document.getElementById('contenedor-carreras').innerText = '⚠️ Error cargando los datos.';
  });

