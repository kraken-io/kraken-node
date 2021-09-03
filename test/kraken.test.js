const Kraken = require('../')
const fs = require('fs')

// Env variables names with API key and secret
const envKey = 'KRAKEN_API_KEY'
const envSecret = 'KRAKEN_API_SECRET'

// Tests extensions
expect.extend({
    toBeKrakenSuccess(status) {
        const result = {
            message: () => 'Unknown error',
            pass: false
        }

        if (status == null) {
            result.message = () => 'Empty status'
        } else if (status.success === true) {
            result.message = () => 'Not passed'
            result.pass = true
        } else if (status.error) {
            result.message = () =>
                `Kraken API returned an error: ${status.error}`
        }

        return result
    }
})

class DevData {
    constructor(data) {
        this.wait = true
        this.dev = true
        Object.assign(this, data)
    }
}

// Main tests
describe('Kraken.io API', () => {
    // Test variables
    let krakenAuth = null
    let kraken = null

    // Test prepare
    beforeAll(() => {
        krakenAuth = {
            api_key: process.env[envKey],
            api_secret: process.env[envSecret]
        }
        kraken = new Kraken(krakenAuth)
    })

    // auth 1
    it('new Kraken({api_key, api_secret})', () => {
        const kraken = new Kraken(krakenAuth)
        expect(kraken.auth).toEqual(krakenAuth)
    })

    // auth 2
    it('new Kraken(api_key, api_secret)', () => {
        const kraken = new Kraken(krakenAuth.api_key, krakenAuth.api_secret)
        expect(kraken.auth).toEqual(krakenAuth)
    })

    // userStatus
    it('kraken.userStatus()', () => {
        return expect(kraken.userStatus()).resolves.toBeKrakenSuccess()
    })

    // url
    it('kraken.url()', () => {
        const data = {
            url: 'https://kraken-nekkraug.netdna-ssl.com/assets/images/kraken-logotype@2x.png',
            wait: true,
            dev: true
        }

        return expect(kraken.url(data)).resolves.toBeKrakenSuccess()
    })

    // url various formats
    describe('kraken.upload({ file })', () => {
        it('file<String> -> catch wrong file path', () => {
            const data = new DevData({
                file: 'test/support/images/wrong-file-path.gif',
                wait: true,
                dev: true
            })

            return expect(kraken.upload(data)).rejects.toHaveProperty(
                'originalError.code',
                'ENOENT'
            )
        })

        it('file<String> -> path', () => {
            const data = new DevData({
                file: 'test/support/images/image.gif'
            })

            return expect(kraken.upload(data)).resolves.toBeKrakenSuccess()
        })

        it('file<Buffer>', () => {
            const fileData = fs.readFileSync('test/support/images/image.gif')
            const data = new DevData({
                file: fileData
            })

            return expect(kraken.upload(data)).resolves.toBeKrakenSuccess()
        })

        it('file<Stream>', () => {
            const fileData = fs.createReadStream(
                'test/support/images/image.gif'
            )
            const data = new DevData({
                file: fileData
            })

            return expect(kraken.upload(data)).resolves.toBeKrakenSuccess()
        })

        it('file<Object>: path and options', () => {
            const data = new DevData({
                file: {
                    path: 'test/support/images/image.gif',
                    options: {}
                }
            })

            return expect(kraken.upload(data)).resolves.toBeKrakenSuccess()
        })

        it('file<Object>: <Buffer> and options', () => {
            const fileData = fs.readFileSync('test/support/images/image.gif')
            const data = new DevData({
                file: {
                    value: fileData,
                    options: {}
                }
            })

            return expect(kraken.upload(data)).resolves.toBeKrakenSuccess()
        })

        it('file<Object>: <Stream> and options', () => {
            const fileData = fs.createReadStream(
                'test/support/images/image.gif'
            )
            const data = new DevData({
                file: {
                    value: fileData,
                    options: {}
                }
            })

            return expect(kraken.upload(data)).resolves.toBeKrakenSuccess()
        })
    })
})
