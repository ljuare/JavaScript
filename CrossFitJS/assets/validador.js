let links = document.querySelectorAll("nav a")

links.forEach(function(link){
	link.onclick = validarLink
}) // Para cada link voy a hacer una validacion ante el click (la funcion esta abajo)				
			
function validarLink(evento){ // "Evento" es un parametro, que puede tener cualquier nombre, que almacena toda la informacion de lo que ocurrió ante un comportamiento. En este caso será de un click sobre cada uno de los links
	evento.preventDefault() // <-- Con esto, JS interrumpe el comportamiento predeterminado por HTML. En este caso me anula el comportamiento predeterminado del hipervinculo que me lleva a otro ejercicio.
	let rta = confirm(`¿Está seguro que desea ir a ${evento.target.innerText.toUpperCase()}?`) // Confirm, como en el ejercicio 1. El target es como un querySelector del elemento que estoy clickeando (en este caso ej.2) por lo que podre manipular todo ese elemento. En este caso voy a llamar al parametro ("evento") al cual estoy clickeando, voy a manipularlo con el tarjet y voy a pedirle que me traiga su innerText que se va a llamar Ejercicio 2.
	// No es necesario llamar al evento ahi, podria haber puesto simplemente "¿Estas seguro que deseas salir de la pagina?"
	// El toUpperCase me va a convertir el texto en mayuscula
	if (rta == true) { // Tambien podria ser (rta) y lo toma igual
		window.location.href = evento.target.href // Window es la ventana del navegador. Con window, JS controla todo el navegador. Acá le estoy diciendo que si mi respuesta es SI, entonces desde la localidad en donde estoy en mi navegador (window.location.href) me mande al evento antes definido.
	}
}