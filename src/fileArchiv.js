const fs = require("fs")
const path = require("path")
const MarkdownIt = require("markdown-it")

const filePath = process.argv[2]

const archiDoc = async (route) => {
	const routeAbsolute = path.resolve(route)
	const fileContent = await fs.promises.readFile(routeAbsolute, "utf8")

	const md = new MarkdownIt()
	const tokens = md.parse(fileContent, {})

	const links = tokens
		.filter(token => token.type === "link_open")
		.map(token => ({
			href: token.attrGet("href"),
			text: "",
			file: routeAbsolute,
		}))

	console.log(links)
}

archiDoc(filePath)
module.exports = archiDoc