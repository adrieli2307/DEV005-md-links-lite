/* eslint-disable no-mixed-spaces-and-tabs */
const archiDoc = require ("../src/fileArchiv")
const filemd = require ("../src/readDoc")


const filePath = process.argv[2]

const mdlinks = (route, objOption) => {
	return new Promise ((resolve)=>{
		//console.log(objOption === undefined ? "Solo extraer links" : "Vamos a validar los links")
	
		 archiDoc(route)
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
  
					Promise.all(validatedLinks).then((linksarray)=>{
						resolve(linksarray)
					})
				} else {
					resolve (links)
				}
			})
	})
	
}

mdlinks(filePath).then((result)=>{
	console.log("resultado",result)
}).catch((error)=>{
	console.error(error)
})
module.exports = mdlinks
