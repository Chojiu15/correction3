const express = require('express')
const playlistRouter = express.Router()
const models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op


playlistRouter.post('/playlist', (req, res) => {
    models
        .Playlist
        .create(req.body)
        .then(playlist => {
            playlist.addTrack(req.body.TrackId),
                {}
            res.json(playlist)
        })
})


playlistRouter.delete('/playlist/:playlistId/remove-track/:trackId', (req, res) => {
    models
        .Playlist
        .findByPk(req.params.playlistId)
        .then(track => {
            track.removeTrack(req.params.trackId)
        })
        res.end('Track deleted')
})



playlistRouter.get('/playlist/:id', (req, res) => {
    models
        .Playlist
        .findByPk(req.params.id, {
            include: [models.Track]
        })
        .then(playlist => res.json(playlist))
})

playlistRouter.get('/playlist', (req, res) => {
    if (req.query.title) {
        models
            .Playlist
            .findAll({
                where: {
                    title: {
                        [Op.like]: `%${req.query.title}%`
                    }
                },
                include: [models.Track]
            })
            .then(playlist => res.json(playlist))
    }
    else if (req.query.genre) {
        models
            .Playlist
            .findAll({
                where: {
                    genre: {
                        [Op.like]: `%${req.query.genre}%`
                    }
                },
                include: [models.Track]
            })
            .then(playlist => res.json(playlist))
    }
    else {
        models
            .Playlist
            .findAll({
                include: [models.Track]
            })
            .then(playlist => res.json(playlist))
    }
})


playlistRouter.delete('/playlist/:id', (req, res) => {
    models
        .Playlist
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(res.end('Playlist Deleted'))
})

playlistRouter.put('/playlist/:id', (req, res) => {
    models
        .Playlist
        .update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(res.end('Playlist update'))
})




module.exports = playlistRouter