
fetch('carreras.json')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));;
    });
  })
  .catch(error => {
    console.error("Error cargando las carreras:", error);
  });
