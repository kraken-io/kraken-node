// Settings and constants
const apiKrakenIo = 'https://api.kraken.io'

/**
 * Provides Kraken API methods list
 *
 * @class KrakenApiList
 */
class KrakenApiList {
    /**
     * Constructs a new KrakenApiList instance. Basicaly just list of object props with url to method.
     * @param {string} url=KrakenApiList.default.url Kraken API URL
     * @param {object} methods=KrakenApiList.default.methods Methods lists object in format [method]: 'path/to/method'
     * @param {string} methods.methodname 'method': '/v/path'
     */
    constructor(
        url = KrakenApiList.default.url,
        methods = KrakenApiList.default.methods
    ) {
        // Convert object with
        for (let method of Object.keys(methods)) {
            this[method] = `${url}/${methods[method]}`
        }
    }
}

KrakenApiList.default = {
    url: apiKrakenIo,
    methods: {
        url: 'v1/url',
        upload: 'v1/upload',
        userStatus: 'user_status'
    }
}

module.exports = KrakenApiList
