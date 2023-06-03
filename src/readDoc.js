/* eslint-disable no-mixed-spaces-and-tabs */
const path = require("path")
const { pathValid } = require("./funcionespath")

const filePath = process.argv[2]

// Existencia de un archivo .md

const filemd = (route) => {
	return new Promise((resolve, reject) => {
	  if (path.extname(route) !== ".md") {
			reject("Ruta inválida o inexistente")
			return
	  }
	  if (path.extname(route) === ".md") {
			resolve("El archivo tiene la extensión .md")
	  } else {
			reject("El archivo no tiene la extensión .md")
	  }
	})
}
  
filemd(filePath)

module.exports = filemd