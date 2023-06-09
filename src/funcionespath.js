/* eslint-disable no-mixed-spaces-and-tabs */
const fs = require("fs")
const path = require("path")



// Función para validar las rutas 

const pathValid = (filePath) => {
	const exists = fs.existsSync(filePath)
	//console.log(exists ? "Sí existe" : "No existe")
	if (exists) {
	  return filePath
	} else {
	  // Convertir si es relativa a absoluta
	  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(filePath)
	  //console.log("Convirtiendo la ruta en absoluta");
	  return absolutePath
	}
}




module.exports = {
	pathValid,
}