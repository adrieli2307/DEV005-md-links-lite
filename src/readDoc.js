const fs = require("fs")
const path = require("path")
const { pathValid, absolutePath } = require("./funcionespath")

const filePath = process.argv[2]

// Existencia de un archivo .md

const filemd = (route) => {
	const routeAbsolute = absolutePath(route)
	if (pathValid(routeAbsolute)) {
		if (path.extname(routeAbsolute) === ".md") {
			fs.promises.readFile(routeAbsolute, "utf8")
				.then((data) => {
					console.log("Contenido del archivo:", data)
				})
				.catch((error) => {
					console.log("Error al leer el archivo:", error)
				})
		} else {
			console.log("El archivo no tiene la extensión .md")
		}
	} else {
		console.log("Ruta inválida o inexistente")
	}
}
filemd(filePath)
module.exports = filemd