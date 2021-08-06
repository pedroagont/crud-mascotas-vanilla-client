(() => {
  'use strict';

  console.log('Hola desde app.js! 👋');

  // 1. TRAER LOS ELEMENTOS CON LOS QUE VAMOS A TRABAJAR DEL HTML/DOM
  const formCrearMascota = document.getElementById('formCrearMascota');
  const contenedorMascotas = document.getElementById('contenedorMascotas');
  const spinner = document.getElementById('spinner');
  const API_URL = 'https://crudcrud.com/api/cba653e00039415abc41a2f46051ee14/mascotas';

  // 2. CREAMOS FUNCIÓN PARA TRAER MASCOTAS
  const getMascotas = async () => {
    try {
      const response = await fetch(API_URL)
      const mascotas = await response.json();
      return mascotas;
    } catch (e) {
      throw new Error('Error: ', e)
    }
  }

  // 3. CREAMOS FUNCIÓN PARA RENDERIZAR EN HTML LAS MASCOTAS QUE VIENEN DEL API
  const renderizarMascotas = (mascotas) => {
    spinner.style.display = 'none';
    return mascotas.map(mascota => {
      const { nombre, raza, caricatura, descripcion, imagen } = mascota;
      return `<div class="col" style="max-width:300px">
                            <div class="card">
                              <img src="${imagen}" class="card-img-top" alt="${imagen}">
                              <div class="card-body">
                                <h5 class="card-title">${nombre} <span class="badge rounded-pill bg-primary">${raza}</span></h5>
                                <p class="card-text">${caricatura}</p>
                                <p class="small">${descripcion}</p>
                              </div>
                            </div>
                          </div>`
    })
  }

  // 4. CREAMOS FUNCIÓN PARA MANEJAR EL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Creando mascota');
    const formData = new FormData(formCrearMascota);
    const nombre = formData.get('nombre');
    const raza = formData.get('raza');
    const caricatura = formData.get('caricatura');
    const descripcion = formData.get('descripcion');
    const imagen = formData.get('imagen');

    if(nombre == '' || raza == '' || caricatura == '' || descripcion == '' || imagen == '') return alert('Ingresa los datos adecuadamente')

    const jsonMascota = { nombre, raza, caricatura, descripcion, imagen };

    const response = await fetch(API_URL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'cors', // no-cors, *cors, same-origin
      body: JSON.stringify(jsonMascota)
    });

    const mascotaNueva = await response.json();
    console.log('Nueva mascota creada!', mascotaNueva);

    formCrearMascota.reset();
    init();
  }

  // 5. AGREGAMOS EL EVENT LISTENER PARA CUANDO SE DÉ CLICK AL SUBMIT DEL FORMULARIO PARA CREAR MASCOTA
  formCrearMascota.addEventListener('submit', handleSubmit);

  // CREAMOS UNA FUNCIÓN PARA INICIALIZAR NUESTRA APP
  const init = async () => {
    contenedorMascotas.innerHTML = '';
    const mascotas = await getMascotas();
    contenedorMascotas.innerHTML = renderizarMascotas(mascotas);
  }

  init();

})();
