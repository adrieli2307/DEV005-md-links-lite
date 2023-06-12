/* eslint-disable no-mixed-spaces-and-tabs */
const axios = require ("axios")


// Validación de los links extraidos

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
  

module.exports = {
	validate,
}




