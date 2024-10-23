// Busco el boton (btnBuscar), cuando se pulsa, obtengo los valores ingresados (inputBuscar)
document.getElementById('btnBuscar').addEventListener('click', async () => {
    const search = document.getElementById('inputBuscar').value;

    if(search) { // si hay algo, hago fetch
        await fetchImages(search);
    } else { // Si no se ingresan valores dar |error?/pedir?|
        alert('Ingresar datos para la busqueda');
    }
});

async function fetchImages(q) { // fetch y llamo a la funcion para mostrar resultados
    const url = `https://images-api.nasa.gov/search?q=${q}`;
    try {
        const responseAPI = await fetch(url);
        const data = await responseAPI.json();
        showDataItems(data.collection.items);
    } catch (error) {
        console.error('Error al obtener datos desde la API: ',error);
    }
}


function showDataItems(items) {
    const conteiner = document.getElementById('contenedor');
    conteiner.innerHTML = ''; // limpio para una nueva búsqueda

    let row = `<div class="row g-4">`;

    items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        
        // Estaba teniendo un problema para mostrar la imagen, chatGPT me hizo poner la 34 y quedo flama
        const imageUrl = item.links && item.links[0] ? item.links[0].href : 'https://via.placeholder.com/150';

        const card = `
        <div class="col-md-4"> <!-- Columna de 4 unidades en pantallas medianas -->
            <div class="card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">${date_created}</small>
                </div>
            </div>
        </div>
        `;

        row += card;
    });

    row += `</div>`;

    conteiner.innerHTML = row;
}

