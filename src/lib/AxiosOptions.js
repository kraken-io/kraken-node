/**
 * Provides options processing for axios
 *
 * @class AxiosOptions
 */
class AxiosOptions {
    /**
     * Constructs a new AxiosOptions instance
     * @param {object} defaults Default options
     * @param {object} options New options
     */
    constructor(defaults, options) {
        Object.assign(this, defaults, options)
        if (defaults && options) {
            const h1 = defaults.headers
            const h2 = options.headers
            if (h1 || h2) {
                this.headers = Object.assign({}, h1, h2)
            }
        }
    }
}

module.exports = AxiosOptions
