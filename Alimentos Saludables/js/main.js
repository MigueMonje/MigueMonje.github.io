/* eslint-env browser */

firebase.initializeApp({
    apiKey: "AIzaSyC4cBY0eVRjDtCln0SECguIAkNsPbOi1Fg",
    authDomain: "productos-89bca.firebaseapp.com",
    projectId: "productos-89bca"
})

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore()

// Constantes
const products = db.collection("productos") // Colecion con los productos
const input = document.getElementById("input") // Formulario prinsipal
const name = document.getElementById("name") // input con el nombre del producto
const cuant = document.getElementById("cuant") // input con la cantidad (en kg) del producto
const out = document.getElementById("out") // Tabla con la salida del programa

let product = {}, intCuant = 0, recipe ={}

input.addEventListener("submit",(e)=>{
	e.preventDefault()
	
	product = products.doc(name.value.toLowerCase()) // Obtener la referencia al producto en la base de datos
	product.get() // Para despues abrirlo
		.then((doc)=>{
			if(doc.exists){
				// Y extraer la reseta, si en verdad existia el producto
				console.log(doc.data())
				recipe = doc.data()
			}
			else{ // Si no
				console.error("Document not found") // Mandar un error
			}
		})
		.catch((err)=>{
			console.error(err)
		})
	
	intCuant = parseFloat(cuant.value) // Obtener la cantidad de profucto
	
	while(out.hasChildNodes()){
		out.removeChild(out.firstChild)
	}
	
	for(let ingredient in recipe){
		let nameEl = document.createElement("p")
		nameEl.textContent = `${ingredient}:`
		nameEl.setAttribute("class","left")
		let valEl = document.createElement("p")
		valEl.textContent = `${(intCuant / 100) * recipe[ingredient]}kg`
		valEl.setAttribute("class","right")
		out.appendChild(nameEl)
		out.appendChild(valEl)
	}
	
})