const express = require('express')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const router = require('./routes/index')



let _server


const server = {
    start() {

        const app = express()

        app.disable('x-powered-by')
       



        app.use(bodyParse.json())
        app.use(bodyParse.urlencoded({ extended: false }))
    
    
        router(app)

        _server = app.listen(8080, () => {
            console.log(`Servidor arrancado en http://localhost:8080}`)
        })
    },
    close() {
        _server.close()
    }
}

module.exports = server


if (!module.parent) {
    server.start()
}
