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
          ? `<a href="${carrera.Web}" target="_blank">${normalizar(carrera.Web)}</a>` 
          : "No disponible"}</p>
      `;
      contenedor.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Error cargando las carreras:', err);
    document.getElementById('contenedor-carreras').innerText = '⚠️ Error cargando los datos.';
  });

