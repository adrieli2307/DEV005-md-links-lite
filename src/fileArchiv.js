const fs = require("fs")
const path = require("path")


const filePath = process.argv[2]


// Extraer los archivos 

const archiDoc = (route) => {
	const routeAbsolute = path.resolve(route)
	return fs.promises
		.readFile(routeAbsolute, "utf8")
		.then((fileContent) => {
			console.log(fileContent);
			return fileContent
		})
		.catch((error) => {
			console.log("Error al leer el archivo:", error)
			return []
		})
}

archiDoc(filePath)
module.exports = archiDoc