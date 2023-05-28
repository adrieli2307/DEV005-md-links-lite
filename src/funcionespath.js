const fs = require("fs")
const path = require("path")


const existPath = process.argv[2]

// Función para validar las rutas 
const pathValid = (filePath) => {
	console.log(filePath)
	const exists = fs.existsSync(filePath)
	console.log(exists ? "Sí existe" : "No existe")
	return exists
}

// Convertir si es relativa a absoluta 

const absolutePath = (existPath) => {
	if (path.isAbsolute(existPath)) {
		console.log("La ruta ya es absoluta")
		return existPath
	} else {
		console.log("Convirtiendo la ruta en absoluta")
		return path.resolve(existPath)
	}
}


pathValid(existPath)
absolutePath(existPath)


module.exports = {
	pathValid,absolutePath,
}