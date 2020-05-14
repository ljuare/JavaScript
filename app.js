const express = require("express")

const server = express()

const docs = express.static("docs")

server.use(docs)

server.get("/holas.html", function(request, response){ // Con ctrl + c apago la consola
    response.end("Acá van a mostrarse las ofertas MercadoTECH")
})

//server.post()

server.listen(80)
