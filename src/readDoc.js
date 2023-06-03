/* eslint-disable no-mixed-spaces-and-tabs */
const fs = require("fs")
const path = require("path")
const { pathValid } = require("./funcionespath")

const filePath = process.argv[2]

// Existencia de un archivo .md

const filemd = (route) => {
	return new Promise((resolve, reject) => {
	  if (!pathValid(route)) {
			reject("Ruta inválida o inexistente")
			return
	  }
	  if (path.extname(route) !== ".md") {
			reject("El archivo no tiene la extensión .md")
			return
	  }
	  fs.promises.readFile(route, "utf8")
			.then((data) => {
		  console.log("Contenido del archivo:", data)
		  resolve(data)
			})
			.catch((error) => {
		  console.log("Error al leer el archivo:", error)
		  reject(error)
			})
	})
}
filemd(filePath)
module.exports = filemd