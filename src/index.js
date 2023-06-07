/* eslint-disable no-mixed-spaces-and-tabs */
const archiDoc = require ("../src/fileArchiv")
const filemd = require ("../src/readDoc")
const validate = require ("./validate")
const {pathValid} = require ("./funcionespath")




const filePath = process.argv[2]

const mdlinks = (route, objOption) => {
	return new Promise((resolve, reject) => {
	  const absolutePath = pathValid(filePath)
	  if (!absolutePath) {
			reject(new Error("Ruta inexistente"))
			return
	  }
	  filemd(absolutePath)
			.then((fileExtrac) => {
		  archiDoc(fileExtrac, absolutePath)
					.then((links) => {
			  if (objOption.validate) {
							validate(links)
				  .then((validatedLinks) => resolve(validatedLinks))
				  .catch((error) => reject(error))
			  } else {
							resolve(links)
			  }
					})
					.catch((error) => reject(error))
			})
	})
}
module.exports = mdlinks
