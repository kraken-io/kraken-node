/**
 * Provides kraken API data processing
 *
 * @class KrakenApiData
 */
class KrakenApiData {
    /**
     * Constructs a new KrakenApiData instance
     * @param {Kraken} kraken Kraken instance
     * @param {any} options Kraken API options
     */
    constructor(kraken, options) {
        Object.assign(this, { auth: kraken.auth }, options)
    }

    /**
     * Convert this object to JSON string
     * @returns {string}
     */
    toJson() {
        return JSON.stringify(this)
    }
}

module.exports = KrakenApiData
