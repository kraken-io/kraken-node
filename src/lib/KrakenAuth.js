/**
 * Provides Kraken.io credentials for API
 *
 * @class KrakenAuth
 */
class KrakenAuth {
    /**
     * Constructs a new KrakenAuth instance
     * @param {string} key Kraken.io API key
     * @param {string} secret Kraken.io API secret
     */
    constructor(key, secret) {
        this.api_key = key
        this.api_secret = secret
    }
}

module.exports = KrakenAuth
