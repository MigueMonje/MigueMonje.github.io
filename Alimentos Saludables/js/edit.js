/* eslint-env browser */

firebase.initializeApp({
    apiKey: "AIzaSyC4cBY0eVRjDtCln0SECguIAkNsPbOi1Fg",
    authDomain: "productos-89bca.firebaseapp.com",
    projectId: "productos-89bca"
})

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore()


// Constantes
const products = db.collection("productos")
const input = document.getElementById("input")
const name = document.getElementById("name")
const productInterface = {
	el: document.getElementById("pInter"),
	name: document.getElementById("sName"),
	val: document.getElementById("sVal"),
	delete: document.getElementById("sDelete"),
	save: document.getElementById("sSave"),
	add: document.getElementById("sAdd"),
	sub: document.getElementById("sSub")
}
// Datos
let productData = {
	name: "",
	val: {}
}
let product = {}

// Abrir el producto
input.addEventListener("submit",(e)=>{
	e.preventDefault()
	
	// obtner datos
	productData.name = name.value.toLowerCase()
	product = products.doc(productData.name)
	product.get()
		.then((doc) => {
			if(doc.exists){
				productData.val = doc.data()
			}
		})
	// Resetear la interfas
	while(productInterface.val.hasChildNodes()){
		productInterface.val.removeChild(productInterface.val.firstChild)
	}
	// Mostrar el producto en la interfas
	productInterface.name.textContent = productData.name
	for(let ingredient in productData.val){
		let nameEl = document.createElement("input")
		let valEl = document.createElement("input")
		nameEl.value = ingredient
		nameEl.setAttribute("class","JSname")
		valEl.value = productData.val[ingredient]
		valEl.setAttribute("class","JSval")
		productInterface.val.appendChild(nameEl)
		productInterface.val.appendChild(valEl)
	}
	productInterface.el.setAttribute("class","")
})

// Añadir ingredientes al producto el producto
productInterface.add.addEventListener("click",()=>{
	// Añadir un campo
	let nameEl = document.createElement("input")
	let valEl = document.createElement("input")
	nameEl.value = "nombre"
	nameEl.setAttribute("class","JSname")
	valEl.value = 0
	valEl.setAttribute("class","JSval")
	productInterface.val.appendChild(nameEl)
	productInterface.val.appendChild(valEl)
})

// Quitar ingredientes del producto
productInterface.sub.addEventListener("click",()=>{
	productInterface.val.removeChild(productInterface.val.lastChild)
	productInterface.val.removeChild(productInterface.val.lastChild)
})

// Guardar producto
productInterface.save.addEventListener("click",()=>{
	let newData = {}
	let nameEls = document.getElementsByClassName("JSname")
	let valEls = document.getElementsByClassName("JSval")
	for(let i = 0; i < nameEls.length; i++){
		newData[nameEls[i].value] = parseFloat(valEls[i].value)
	}
	console.log(newData)
	product.set(newData)
})

// Borrar producto
productInterface.delete.addEventListener("click",()=>{
	product.delete()
	productInterface.el.setAttribute("class","ocult")
})