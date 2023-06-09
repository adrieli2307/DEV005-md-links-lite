/* eslint-disable no-useless-escape */
/* eslint-disable no-mixed-spaces-and-tabs */
const fs = require("fs")
const path = require("path")


//const filePath = process.argv[2]


// Extraer los archivos
const archiDoc = (pathFile) => {
	return new Promise((resolve, reject) => {
	  fs.readFile(pathFile, "utf8", (error, fileContent) => {
			if (error) {
		  reject(error)
			} else {
		  // Expresión regular que captura enlaces
		  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g
		  const links = Array.from(fileContent.matchAll(linkRegex), (match) => ({
					href: match[2],
					text: match[1],
					file: path.resolve(pathFile),
		  }))
		  resolve(links)
			}
	  })
	})
}
// Llamar a la función archiDoc y manejar la promesa resultante
//archiDoc(filePath)

module.exports = {
	archiDoc,
}