const archiDoc = require ("../src/fileArchiv")
const filemd = require ("../src/readDoc")

const mdlinks = (route, objOption) => {
	console.log(objOption === undefined ? "Solo extraer links" : "Vamos a validar los links")
	
	return archiDoc(route)
		.then((links) => {
			if (objOption && objOption.validate) {
				const validatedLinks = links.map((link) => {
					const { href, text, file } = link
					return filemd.validateLink(href)
						.then((result) => ({
							href,
							text,
							file,
							status: result.status,
							ok: result.ok,
						}))
						.catch((error) => ({
							href,
							text,
							file,
							status: 0,
							ok: "fail",
							error,
						}))
				})

				return Promise.all(validatedLinks)
			} else {
				return links
			}
		})
}

mdlinks("./validate.js")
	.then((result) => {
		console.log(result) // Imprimir los resultados obtenidos
	})
	.catch((error) => {
		console.log(error) // Manejar el error en caso de que ocurra
	})
