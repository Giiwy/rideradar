fetch('carreras.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar el JSON');
    return res.json();
  })
  .then(data => {
    console.log(data); // o renderiza los datos
  })
  .catch(err => console.error('Error cargando las carreras:', err));
