'use-strict'

module.exports = (sequelize, Datatypes) => {
    const Playlist = sequelize.define('Playlist', {
        title: Datatypes.STRING,
        genre: Datatypes.STRING
    }, {
        timestamps : false
    })

    Playlist.associate = models => {
        Playlist.hasMany(models.Track)
    }

    return Playlist
}