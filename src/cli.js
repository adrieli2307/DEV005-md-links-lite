const {mdlinks} = require ("./index")


const path = process.argv[2]

mdlinks(path, {validate:true})
	.then((links)=>{
		console.log(links)
	}).catch((error)=>{
		console.error(error)
	})