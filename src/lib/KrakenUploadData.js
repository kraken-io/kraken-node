// NodeJS libs
const fs = require('fs')
const path = require('path')
const { Stream } = require('stream')
const crypto = require('crypto')

// External libs
const FormData = require('form-data')

// Internal libs
const KrakenApiData = require('./KrakenApiData')

// Constants and settings
const nameLen = 20
const readOptions = { flags: 'r' }

/**
 * KrakenUploadData processing a data for uploading.
 * @class KrakenUploadData
 * @extends {FormData}
 */
class KrakenUploadData extends FormData {
    /**
     * @typedef {Object} FileOptions
     * @property {String|Object} header Header or headers
     * @property {Number} knownLength File known length
     * @property {String} filename File name
     * @property {String} filepath File path
     * @property {String} contentType Content type
     */

    /**
     * @typedef {Object} FileDetails
     * @property {String|Stream|Buffer} value Path to file or fiel data
     * @property {FileOptions} options File options {@link FileOptions}
     */

    /**
     * @typedef {Object} UploadOptions
     * @property {String|FileDetails} file Path to file or file details {@link FileDetails}
     */

    /**
     *
     * Constructs a new instance of KrakenUploadData and process options for uploading.
     *
     * @param {Kraken} kraken The kraken object isntance
     * @param {UploadOptions} options The upload options {@link UploadOptions}     *
     */
    constructor(kraken, options) {
        super()
        const data = new KrakenApiData(kraken, options) // Process general kraken options
        delete data.file

        // Add options to the form as json
        this.append('data', data.toJson())

        // Prepare variables
        const file = options.file
        let fileData = file // Set default data as file prop (Buffer, Stream or whatever)
        let opt = {}

        // Processing various types of data
        if (typeof file === 'string' || file instanceof String) {
            // createReadStream is async - file access check is required to be sync
            fs.accessSync(file, fs.constants.R_OK)
            fileData = fs.createReadStream(file, readOptions)
            opt.filename = path.basename(file) // Set the filename for form data
        } else if (file instanceof Object) {
            // TODO: In case of breaking changes - update
            // this block and method's options format to flat version
            if (typeof file.path === 'string' || file instanceof String) {
                fs.accessSync(file.path, fs.constants.R_OK)
                fileData = fs.createReadStream(file.path, readOptions)
            } else if (file.value) {
                fileData = file.value
            } else {
                throw new Error(
                    'Not found required option `file.path` or `file.value`'
                )
            }
            opt = file.options || {}
        }

        // Set length parameter for formData options
        // in case if length property is present
        if (typeof file.length === 'number') {
            opt.knownLength = file.length
        }

        // Generate random filename in case if it missing
        opt.filename =
            file.filename || crypto.randomBytes(nameLen).toString('hex')

        // Add file data and file options to form
        this.append('file', fileData, opt)
    }
}

module.exports = KrakenUploadData
