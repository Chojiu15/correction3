'use-strict'

module.exports = (sequelize, Datatype) => {
    const Track = sequelize.define('Track', {
        title : Datatype.STRING,
        artiste : Datatype.STRING,
        album_url : Datatype.STRING,
        youtube_url : Datatype.STRING
    }, {
        timestamps : false,
        underscored : true
    })

    Track.associate = models => {
        Track.belongsTo(models.Playlist)
    }

    return Track
}