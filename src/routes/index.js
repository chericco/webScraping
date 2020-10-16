const find = require('./find')

module.exports = app => {

    app.use('/find', find)
   
    app.use((req, res, next) => {

        res.json('404', {
            Error: 'La ruta que esta intentando acceder no existe!'
        })

        next()
    })

}