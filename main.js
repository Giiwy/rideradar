fetch('/carreras.json') // OJO: barra al inicio → desde la raíz del dominio
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar el JSON');
    return res.json();
  })
  .then(data => {
    const contenedor = document.getElementById('contenedor-carreras');
    data.forEach(carrera => {
      const div = document.createElement('div');
      div.className = 'carrera';
      div.innerHTML = `
        <h2>${carrera.Nombre}</h2>
        <p><strong>Tipo:</strong> ${carrera.Tipo}</p>
        <p><strong>Modalidad:</strong> ${carrera.Modalidad}</p>
        <p><strong>Fecha:</strong> ${carrera.Fecha}</p>
        <p><strong>Ubicación:</strong> ${carrera.Ubicación}</p>
        <p><strong>Distancia:</strong> ${carrera.Distancia}</p>
        <p><strong>Desnivel:</strong> ${carrera.Desnivel}</p>
        <p><strong>Web:</strong> <a href="${carrera.Web}" target="_blank">${carrera.Web}</a></p>
      `;
      contenedor.appendChild(div);
    });
  })
  .catch(err => console.error('Error cargando las carreras:', err));
