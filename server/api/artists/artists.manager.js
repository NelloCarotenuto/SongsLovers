// Module dependencies
const logger = require('../../config/logger');

const Artist = require('./artists.model');

// Export module functions
module.exports.getArtistFromCache = getArtistFromCache;
module.exports.saveArtistToCache = saveArtistToCache;
module.exports.updateArtistInCache = updateArtistInCache;

async function getArtistFromCache(id) {
    try {
        return await Artist.findOne({id : id}, '-_id -__v');
    } catch(err) {
        logger.error(`Error occurred while getting the artist ${id} from cache - ${err}`);
    }
}

async function saveArtistToCache(artist) {
    try {
        await Artist.create(artist);
    } catch(err) {
        logger.error(`Error occurred while saving the artist ${artist.id} to cache - ${err}`);
    }
}

async function updateArtistInCache(artist) {
    try {
        let result = await Artist.updateOne({id : artist.id}, artist);

        if (result.nModified !== 1) {
            logger.warn(`Something went wrong when updating the artist ${artist.id} in cache`);
        }
    } catch(err) {
        logger.error(`Error occurred while updating the artist ${artist.id} in cache - ${err}`);
    }
}
