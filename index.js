const express = require('express')
const models = require('./models')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser({
    extended : true
}))

const PlaylistRouter = require('./routes/playlist')
const TrackRouter = require('./routes/track')


app.use('/', PlaylistRouter, TrackRouter) 


models
    .sequelize
    .sync()
    .then(app.listen(3000), () => {
        console.log(`Server is running`)
    })