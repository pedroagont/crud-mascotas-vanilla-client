(() => {
  'use strict';

  console.log('Hola desde app.js! 👋');

  // 1. TRAER LOS ELEMENTOS CON LOS QUE VAMOS A TRABAJAR DEL HTML/DOM
  const formCrearMascota = document.getElementById('formCrearMascota');
  const contenedorMascotas = document.getElementById('contenedorMascotas');
  const spinner = document.getElementById('spinner');
  
  const API_URL = 'https://crudcrud.com/api/fd194da2acd3418ebc4c8474ccd9bcd1/mascotas';

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
    mascotas.map(mascota => {
      const { nombre, raza, caricatura, descripcion, imagen } = mascota;

      const divCol = document.createElement('div')
      divCol.setAttribute('class', 'col')
      divCol.setAttribute('style', 'max-width: 300px');

      const divCard = document.createElement('div')
      divCard.setAttribute('class', 'card');

      const imgTag = document.createElement('img')
      imgTag.setAttribute('class', 'card-img-top')
      imgTag.setAttribute('src', imagen)
      imgTag.setAttribute('alt', imagen);

      const divCardBody = document.createElement('div')
      divCardBody.setAttribute('class', 'card-body');

      const divCardTitle = document.createElement('div')
      divCardTitle.setAttribute('class', 'card-title')
      divCardTitle.innerHTML = nombre + ' ';

      const spanBadgeTag = document.createElement('span')
      spanBadgeTag.setAttribute('class', 'badge rounded-pill bg-primary')
      spanBadgeTag.innerHTML = raza;

      const divCardSubtitle = document.createElement('div')
      divCardSubtitle.setAttribute('class', 'card-text')
      divCardSubtitle.innerHTML = caricatura;

      const divCardDescription = document.createElement('div')
      divCardDescription.setAttribute('class', 'small')
      divCardDescription.innerHTML = descripcion;

      divCol.appendChild(divCard);
      divCardTitle.appendChild(spanBadgeTag);
      divCard.append(imgTag, divCardBody);
      divCardBody.append(divCardTitle, divCardSubtitle, divCardDescription);

      contenedorMascotas.appendChild(divCol);
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
    renderizarMascotas(mascotas);
  }

  init();

})();
