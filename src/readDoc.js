/* eslint-disable no-mixed-spaces-and-tabs */
const path = require("path")


const filePath = process.argv[2]

// Existencia de un archivo .md

const filemd = (route) => {
	return new Promise((resolve, reject) => {
	    if (path.extname(route) !== ".md") {
			reject("El archivo no tiene la extensión .md o la ruta es inválida")
		  } else {
			resolve("El archivo tiene la extensión .md")
		  }
	})
	  }
	  

filemd(filePath)
	  .then((result) => console.log(result))
	  .catch((error) => console.error(error))

module.exports = filemd