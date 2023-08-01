/*!
 * Kraken
 * Copyright (c) 2013-2021 Kraken.io <support@kraken.io>
 * MIT Licensed
 */

// External libs
const axios = require('axios')

// Internal libs
const AxiosOptions = require('./lib/AxiosOptions')
const KrakenApiData = require('./lib/KrakenApiData')
const KrakenApiList = require('./lib/KrakenApiList')
const KrakenAuth = require('./lib/KrakenAuth')
const KrakenResponse = require('./lib/KrakenResponse')
const KrakenUploadData = require('./lib/KrakenUploadData')

// Constants and settings
const packageInfo = require('../package.json') // Load package info
const userAgent = `kraken-node/${packageInfo.version}` // Set default user agent

// Internal static methods - private static methods doesn't well supported in node yet.
// Convert axios response to kraken response
function convertResposne(res) {
    return new KrakenResponse(res.data)
}

// Convert axios or standard error to kraken response
function convertError(err) {
    const res = err.response

    // In some cases err.response can be empty (network errors and etc.)
    if (res) {
        // Got data from server response
        if (res.data) {
            return new KrakenResponse(res.data) // Standard Kraken error
        }

        // Server response without data or it can't be processed by axios
        return new KrakenResponse({
            success: false,
            error: err.toString(),
            status: {
                // Extended error info
                code: res.status,
                text: res.statusText
            },
            originalError: err
        })
    }

    // Response is empty - processing all other errors kinds
    return new KrakenResponse({
        success: false,
        error: err.toString(),
        originalError: err
    })
}

// Send POST request using axios
function axiosPost(url, data, axiosOpts, cb) {
    const result = axios
        .post(url, data, axiosOpts) // Sending request
        .then(convertResposne) // Response processing
        .catch(convertError) // Errors processing

    if (cb) {
        // Callback processing
        result
            .then(function (status) {
                cb(null, status)
            }) // Result to callback
            .catch(function (err) {
                cb(err, null)
            }) // Error to callback
    }
    return result
}

/**
 * This class describes a Kraken-io API
 *
 * @class Kraken (name)
 */
class Kraken {
    /**
     * Constructs a new Kraken instance
     * @param {object} keyOrAuth Kraken API key and secret
     * @param {string} keyOrAuth Kraken API key
     * @param {string} [secret=null] Kraken API secret
     * @memberof Kraken
     */
    constructor(keyOrAuth, secret = null) {
        if(!keyOrAuth) throw new Error('Please provide an API key');

        if (keyOrAuth instanceof KrakenAuth) {
            this.auth = keyOrAuth
        } else if (keyOrAuth instanceof Object) {
            this.auth = new KrakenAuth(keyOrAuth.api_key, keyOrAuth.api_secret)
        } else if (
            typeof keyOrAuth === 'string' &&
            typeof secret === 'string'
        ) {
            this.auth = new KrakenAuth(keyOrAuth, secret)
        }
        else {
            throw new Error('Please provide an API key and secret');
        }
        this.api = new KrakenApiList()
    }

    /**
     * Upload image to Kraken.io and optimize it
     * @param {object} options Kraken options for uploaded image
     * @param {Function} cb=null
     * @returns {Promise<KrakenResponse>}
     */
    upload(options, cb = null) {
        // FS operations - need to catch them too and return as rejected promise
        try {
            var data = new KrakenUploadData(this, options) // Processing options
        } catch (err) {
            return Promise.reject(
                new KrakenResponse({
                    success: false,
                    error: err.toString(),
                    originalError: err
                })
            )
        }
        const axiosOpts = new AxiosOptions(Kraken.default.axios, {
            // Processing axios options
            headers: data.getHeaders()
        })
        return axiosPost(this.api.upload, data, axiosOpts, cb) // Sending request
    }

    /**
     * Optimize image from URL
     * @param {object} options Kraken options for url
     * @param {Function} cb=null Callback
     * @returns {Promise}
     */
    url(options, cb = null) {
        const data = new KrakenApiData(this, options) // Processing options
        const axiosOpts = new AxiosOptions(Kraken.default.axios) // Processing axios options
        return axiosPost(this.api.url, data, axiosOpts, cb) // Sending request
    }

    /**
     * Get user status
     * @param {Function} [cb=null] Callback
     * @return {Promise}
     * @memberof Kraken
     */
    userStatus(cb = null) {
        const data = new KrakenApiData(this) // Processing options
        const axiosOpts = new AxiosOptions(Kraken.default.axios) // Processing axios options
        return axiosPost(this.api.userStatus, data, axiosOpts, cb) // Sending request
    }
}

Kraken.KrakenApiList = KrakenApiList
Kraken.KrakenAuth = KrakenAuth
Kraken.default = {
    axios: new AxiosOptions({
        responseType: 'json',
        headers: { 'User-Agent': userAgent }
    })
}

module.exports = Kraken
