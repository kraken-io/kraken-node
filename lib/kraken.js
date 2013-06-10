/*!
* Kraken
* Copyright (c) 2013 Przemek Matylla <przemek@matylla.pl>
* MIT Licensed
*/


/**
* Module dependencies.
*/

var https = require('https')
  , fs    = require('fs')
  , path  = require('path')
  , multi = require('multiparter')
  , mime  = require('mime');


/**
* Constructor
*/

var Kraken = module.exports = function(opts) {
  this.auth = {
    api_key: opts.api_key || '',
    api_secret: opts.api_secret || ''
  };
};


/**
* Pass the given `image` URL along with credentials to Kraken API via HTTPS POST.
*
* @param {Object} opts
* @param {Function} cb
* @api public
*/

Kraken.prototype.url = function(opts, cb) {
  opts.auth = this.auth;

  var jsonData = JSON.stringify(opts);

  var options = {
    host: 'api.kraken.io',
    path: '/url',
    method: 'POST',
    headers: {
      'Content-Length': jsonData.length
    }
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');

    res.on('data', function(data) {
      cb(JSON.parse(data));
    });
  });

  req.write(jsonData);
  req.end();
};


/**
* Upload the given `file` along with credentials to Kraken API via HTTPS POST.
*
* @param {Object} opts
* @param {Function} cb
* @api public
*/

Kraken.prototype.upload = function(opts, cb) {
  opts.auth = this.auth;

  var filepath = opts.file;

  fs.stat(filepath, function(err, stats) {
    if (err) {
      return cb({
        'success': false,
        'error': 'Requested file not found'
      });
    }

    var req = new multi.request(https, {
      host: 'api.kraken.io',
      path: '/upload',
      method: 'POST'
    });

    delete opts.file;

    req.setParam('data', JSON.stringify(opts));

    req.addStream(
      'upload',
      path.basename(filepath),
      mime.lookup(filepath),
      stats.size,
      fs.createReadStream(filepath)
    );

    req.send(function(err, res) {
      if (err) {
        cb({
          'success': false,
          'error': 'Error while sending HTTPS request'
        });
      }

      var data = '';

      res.setEncoding('utf8');

      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function() {
        cb(JSON.parse(data));
      });

      res.on('error', function(err) {
        cb(err);
      });
    });
  });
};
