let botonIntentar = document.querySelector(".container__boton");
let botonReiniciar = document.querySelector("#reiniciar");
let input = document.querySelector(".container__input");
let intentos = 1;
let maximoIntentos = 3;
let listaNumerosSorteados = [];
let numeroSecreto = generarNumeroSecreto();

// Asignar texto a los elementos a traves de funcion
function asignarTextoElemento(elemento, texto) {
	let elementoHtml = document.querySelector(elemento);
	elementoHtml.textContent = texto;
	return;
}

// Funcion para generar un numero aleatorio
function generarNumeroSecreto() {
	// Si la lista ya tiene 10 elementos la vaciamos;
	if (listaNumerosSorteados.length === 10) {
		listaNumerosSorteados = [];
	}

	// Generamos el numero Sorteado
	let numeroSorteado = Math.floor(Math.random() * 10) + 1;
	console.log(numeroSorteado);
	console.log(listaNumerosSorteados);

	// Si el numero sorteado ya esta en la lista, generamos otro nuevo
	if (listaNumerosSorteados.includes(numeroSorteado)) {
		return generarNumeroSecreto();
	} else {
		// Si el numero sorteado no esta en la lista lo agregamos, y lo retornamos
		listaNumerosSorteados.push(numeroSorteado);
		return numeroSorteado;
	}
}

// Funcion para mostrar los texto inciales e inicializar el juego
function condicionesIniciales() {
	asignarTextoElemento("h1", "Juego del número secreto");
	asignarTextoElemento("p", "Elije un número entre 1 y 10");
	numeroSecreto = generarNumeroSecreto();
	intentos = 1;
}

function verificarIntento() {
	botonIntentar.addEventListener("click", () => {
		let numeroIngresado = parseInt(input.value);

		if (numeroIngresado < 1 || numeroIngresado > 10) {
			asignarTextoElemento("p", "Debes ingresar un número entre 1 y 10");
			return;
		}

		if (numeroIngresado == numeroSecreto) {
			asignarTextoElemento(
				"p",
				`Felicidades haz acertado el numero secreto en ${intentos} ${
					intentos == 1 ? "intento" : "intentos"
				}`
			);
			reiniciarJuego();
			botonReiniciar.removeAttribute("disabled");
			botonIntentar.setAttribute("disabled", true);
		} else {
			if (numeroIngresado > numeroSecreto) {
				asignarTextoElemento("p", "El número secreto es menor");
			} else {
				asignarTextoElemento("p", "El número secreto es mayor");
			}

			intentos++; // Incrementamos los intentos
			limpiarCampo();

			if (intentos > maximoIntentos) {
				asignarTextoElemento(
					"p",
					"Lo siento no te quedan más intentos"
				);

				botonIntentar.setAttribute("disabled", true);
				botonReiniciar.removeAttribute("disabled");
				reiniciarJuego();
			}
		}
	});
	return;
}

function limpiarCampo() {
	document.querySelector(".container__input").value = "";
}

function reiniciarJuego() {
	botonReiniciar.addEventListener("click", () => {
		// Limpiar Campo
		limpiarCampo();

		// Indicar mensajes iniciales
		// Generar el numero aleatorio
		// Reinciar los intentos
		condicionesIniciales();

		botonIntentar.removeAttribute("disabled");
		botonReiniciar.setAttribute("disabled", true);
	});
}

condicionesIniciales();
verificarIntento();
