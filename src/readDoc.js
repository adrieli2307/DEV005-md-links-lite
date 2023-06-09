/* eslint-disable no-mixed-spaces-and-tabs */

const path = require("path")


// Existencia de un archivo .md
const filemd = (route) => {
	return new Promise((resolve, reject) => {
	    if (path.extname(route) !== ".md") {
			reject("El archivo no tiene la extensión .md o la ruta es inválida")
		  } else {
			resolve(route)
		  }
	})
	  }
	  

module.exports = {
	filemd,
}