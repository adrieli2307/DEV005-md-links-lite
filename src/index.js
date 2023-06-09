/* eslint-disable no-mixed-spaces-and-tabs */
const {archiDoc} = require ("../src/fileArchiv")
const {filemd} = require ("../src/readDoc")
const {validate} = require ("./validate")
const {pathValid} = require ("./funcionespath")


const mdlinks = (filePath, options = {}) => {
	return new Promise((resolve, reject) => {
	  const absolutePath = pathValid(filePath)
	  if (!absolutePath) {
			reject(new Error("Ruta inexistente"))
			return
	  }
	  filemd(absolutePath)
			.then((fileContent) => {
		  archiDoc(fileContent, absolutePath)
		 .then((links) => {
			  if (Array.isArray(links) && links.length > 0) {
			  if (options.validate) {
				  validate(links)
									.then((validate) => resolve(validate))
							} else {
				  resolve(links)
							}
			  } else {
							resolve("No existen enlaces")
			  }
					})
					.catch((error) => reject(error))
			})
	})
}
mdlinks("hello-world.md", {validate:true})
	.then((links)=>{
		console.log(links)
	}).catch((error)=>{
		console.error(error)
	})

module.exports = {
	mdlinks,
}
