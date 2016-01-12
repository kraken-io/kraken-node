/*!
* Kraken
* Copyright (c) 2013-2016 Kraken.io <support@kraken.io>
* MIT Licensed
*/


/**
* Module dependencies
*/

var fs = require("fs"),
    stream = require("stream"),
    request = require("request");


/**
* Constructor
*/

var Kraken = module.exports = function (opts) {
    this.auth = {
        api_key: opts.api_key || "",
        api_secret: opts.api_secret || ""
    };
};


/**
* Pass the given `image` URL along with credentials to Kraken API via HTTPS POST
*
* @param {Object} opts
* @param {Function} cb
* @api public
*/

Kraken.prototype.url = function (opts, cb) {
    opts = opts || {};

    opts.auth = this.auth;

    request.post({
        url: "https://api.kraken.io/v1/url",
        json: true,
        strictSSL: false,
        body: opts
    }, function (err, res, body) {
        if (err) {
            return cb(err);
        }

        cb(body);
    });
};


/**
* Upload the given `file` along with credentials to Kraken API via HTTPS POST.
*
* @param {Object} opts
* @param {Function} cb
* @api public
*/

Kraken.prototype.upload = function (opts, cb) {
    opts = opts || {};

    opts.auth = this.auth;

    var formData = {
        data: JSON.stringify(opts)
    };

    if (opts.file instanceof stream.Stream) {
        formData.file = opts.file;
    } else {
        formData.file = fs.createReadStream(opts.file);
    }


    request.post({
        url: "https://api.kraken.io/v1/upload",
        strictSSL: false,
        formData: formData
    }, function (err, res, body) {
        if (err) {
            return cb(err);
        }

        cb(JSON.parse(body));
    });
};
