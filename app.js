// control de paginas que se púeden cargar
let pagina = 1;
// botones para navegar entre paginas de imagenes cargadas
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

//boton siguiente incrementa en uno la pagina tiene un limite de 10 paginas
btnSiguiente.addEventListener('click', () => {
	if(pagina < 10){
		pagina += 1;
		cargarFotografias();
	}
});

//boton para regresar pagina, tiene un control para solo regresar a la pagina 1
btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarFotografias();
	}
});

//funcion de cargar imagenes
//en el fetch se carga la url de la api, se selecciona el lenguaje a español México, y se le agrega la pagina con la variable, y la llave de autorizacion de pexel
const cargarFotografias = async() => {
	try {
		const respuesta = await fetch(`https://api.pexels.com/v1/search?query=people&languaje=es-MX&page=${pagina}`,{headers: {Authorization: "Isd5tgVr6dZh3o1PtxmHgbjti2RKMKE23alQjGImH5ZIZOl5GBXE0Ajd"}});
	
		console.log(respuesta);
		

			if(respuesta.status === 200){
				const datos = await respuesta.json();
				console.log(datos.photos);
				let fotografias = '';
				datos.photos.forEach(fotografia => {
					//al no poder cargar la url de la imagen se armo combinando datos estaticos y datos propios de la imagen
					//se anexa el id del fotografo y la extension
					fotografias += `
						<div class="fotografia">
							<img class="poster" src="https://images.pexels.com/photos/${fotografia.id}/pexels-photo-${fotografia.id}.jpeg">
							<h3>${fotografia.photographer}</h3>
							<h5>${fotografia.alt}</h5>
						</div>
						`;
				});			
			document.getElementById('contenedor').innerHTML = fotografias;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La imagen que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarFotografias();