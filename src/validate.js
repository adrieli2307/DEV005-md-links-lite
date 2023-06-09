/* eslint-disable no-mixed-spaces-and-tabs */
const axios = require ("axios")
/*const archiDoc = require ("./fileArchiv")*/

const validate = (links) => {
	const linkVali = links.map((link) =>axios
		.head(link.href)
		.then((response) => ({
		  ...link,
		  status: response.status,
		  ok: response.status >= 200 && response.status < 400,
		}))
		.catch(() => ({
		  ...link,
		  status: 404,
		  ok: false,
		}))
	)
	return Promise.all(linkVali)
}
  
/*const ruta = "./hello-world.md"
  
archiDoc(ruta)
	.then((objLinks) => {
	  if (Array.isArray(objLinks) && objLinks.length > 0) {
			return validate(objLinks)
	  }
	  console.log("No existen enlaces")
	  return []
	})
	.then((validatedLinks) => {
	  console.log("Validación de enlaces correcta:", validatedLinks)
	  return validatedLinks
	})
	.catch((error) => {
	  console.log("Error de validación", error)
	})*/

module.exports = {
	validate,
}






/*validate ( {
	href: "https://github.com/krlosh/learnyounode_ejercicios",
	text: "hola",
	file: "C:\\Users\\adri_\\Desktop\\Portafolio JS\\Laboratoria\\DEV005-md-links-lite\\src\\hello-world.md",
})*/

//console.log("El objeto que recibi es:",objLink)
//console.log("El link que voy a validar es:",objLink.href)
