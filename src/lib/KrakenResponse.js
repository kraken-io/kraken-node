/**
 * Just a container for Kraken API response data
 *
 * @class KrakenResponse
 */
class KrakenResponse {
    /**
     * Constructs a new KrakenResponse instance
     * @param {*} data
     */
    constructor(data) {
        Object.assign(this, data)
    }
}

module.exports = KrakenResponse
