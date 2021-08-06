console.log('Hola desde app.js! 👋');

// 1. TRAER LOS ELEMENTOS CON LOS QUE VAMOS A TRABAJAR DEL HTML/DOM
const formCrearMascota = document.getElementById('formCrearMascota');
const contenedorMascotas = document.getElementById('contenedorMascotas');

const API_URL = 'https://crudcrud.com/api/b88b7662e71e4e17b22e2fea02c42209';

const getMascotas = async () => {
  contenedorMascotas.innerHTML = '';
  try {
    const response = await fetch('https://crudcrud.com/api/b88b7662e71e4e17b22e2fea02c42209/mascotas')
    const mascotas = await response.json();
    console.log(renderizarMascotas(mascotas));
    contenedorMascotas.innerHTML = renderizarMascotas(mascotas);
  } catch (e) {
    throw new Error('Error: ', e)
  }
}

const renderizarMascotas = (mascotas) => {
  return mascotas.map(mascota => {
    const { nombre, raza, caricatura, descripcion, imagen } = mascota;
    const mascotaHTML = `<div class="col">
                          <div class="card">
                            <img src="${imagen}" class="card-img-top" alt="${imagen}">
                            <div class="card-body">
                              <h5 class="card-title">${nombre} <span class="badge rounded-pill bg-primary">${raza}</span></h5>
                              <p class="card-text">${caricatura}</p>
                              <p class="small">${descripcion}</p>
                            </div>
                          </div>
                        </div>`
    return mascotaHTML;
  })
}

getMascotas();
