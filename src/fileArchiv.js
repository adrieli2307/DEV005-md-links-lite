const fs = require("fs")
const path = require("path")
const MarkdownIt = require("markdown-it")

//const filePath = process.argv[2]


// Extraer los archivos 

const archiDoc = (route) => {
	const routeAbsolute = path.resolve(route)
	return fs.promises
		.readFile(routeAbsolute, "utf8")
		.then((fileContent) => {
			const md = new MarkdownIt()
			const tokens = md.parse(fileContent, {})
  
			const links = tokens
				.filter((token) => token.type === "link_open")
				.map((token) => ({
					href: token.attrGet("href"),
					text: "",
					file: routeAbsolute,
				}))
  
			console.log("link",links)
			return links
		})
		.catch((error) => {
			console.log("Error al leer el archivo:", error)
			return []
		})
}

//archiDoc(filePath)
module.exports = archiDoc