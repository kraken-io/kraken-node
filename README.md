# Node.js module for Kraken.io API

[![Build Status](https://secure.travis-ci.org/kraken-io/kraken-node.png?branch=master)](http://travis-ci.org/kraken-io/kraken-node)

With this Node module you can plug into the power and speed of [Kraken.io](http://kraken.io/) Image Optimizer.

- [Node.js module for Kraken.io API](#nodejs-module-for-krakenio-api)
  - [Installation](#installation)
  - [Requirements](#requirements)
  - [Dependencies](#dependencies)
  - [Getting Started](#getting-started)
  - [Downloading Images](#downloading-images)
  - [How to use](#how-to-use)
  - [Wait and Callback URL](#wait-and-callback-url)
    - [Wait option](#wait-option)
    - [Callback URL](#callback-url)
  - [Promises](#promises)
  - [Async/Await](#asyncawait)
  - [Authentication](#authentication)
  - [Usage - Image URL](#usage---image-url)
  - [Usage - Image Upload](#usage---image-upload)
  - [Usage - User status](#usage---user-status)
  - [Lossy Optimization](#lossy-optimization)
    - [PNG Images](#png-images)
    - [JPEG Images](#jpeg-images)
  - [Image Resizing](#image-resizing)
  - [WebP Compression](#webp-compression)
  - [Amazon S3 and Rackspace Cloud Files](#amazon-s3-and-rackspace-cloud-files)
    - [Amazon S3](#amazon-s3)
    - [Rackspace Cloud Files](#rackspace-cloud-files)
  - [LICENSE - MIT](#license---mit)

## Installation

    npm install kraken --save

## Requirements

-   Minimum NodeJS version: `12.20.0`

## Dependencies

-   [`form-data`](https://www.npmjs.com/package/form-data)
-   [`axios`](https://www.npmjs.com/package/axios)

## Getting Started

First you need to sign-up for the [Kraken API](https://kraken.io/plans/) and obtain your unique **API Key** and **API Secret**. You will find both under [API Credentials](https://kraken.io/account/api-credentials). Once you have set up your account, you can start using Kraken.io's image optimization API in your applications.

## Downloading Images

Remember: never link to optimized images offered to download. You have to download them first, and then replace them in your websites or applications. Optimized images are available on our servers **for one hour** only, after which they are permanently deleted.

## How to use

You can optimize your images in two ways - by providing an URL of the image you want to optimize or by uploading an image file directly to Kraken API.

The first option (image URL) is great for images that are already in production or any other place on the Internet. The second one (direct upload) is ideal for your deployment process, build script or the on-the-fly processing of your user's uploads where you don't have the images available online yet.

## Wait and Callback URL

Kraken gives you two options for fetching optimization results. With the `wait` option set the results will be returned immediately in the response. With the `callback_url` option set the results will be posted to the URL specified in your request.

### Wait option

With the `wait` option turned on for every request to the API, the connection will be held open unil the image has been optimized. Once this is done you will get an immediate response with a JSON object containing your optimization results. To use this option simply set `"wait": true` in your request.

**Request:**

```javascript
{
    "auth": {
        "api_key": "your-api-key",
        "api_secret": "your-api-secret"
    },
    "url": "http://awesome-website.com/images/header.jpg",
    "wait": true
}
```

**Response**

```javascript
{
    "success": true,
    "file_name": "header.jpg",
    "original_size": 324520,
    "kraked_size": 165358,
    "saved_bytes": 159162,
    "kraked_url": "http://dl.kraken.io/d1aacd2a2280c2ffc7b4906a09f78f46/header.jpg"
}
```

### Callback URL

With the Callback URL the HTTPS connection will be terminated immediately and a unique `id` will be returned in the response body. After the optimization is over Kraken will POST a message to the `callback_url` specified in your request. The ID in the response will reflect the ID in the results posted to your Callback URL.

We recommend [RequestBin.com](http://requestbin.com) as an easy way to capture optimization results for initial testing.

**Request:**

```javascript
{
    "auth": {
        "api_key": "your-api-key",
        "api_secret": "your-api-secret"
    },
    "url": "http://image-url.com/file.jpg",
    "callback_url": "http://awesome-website.com/kraken_results"
}
```

**Response:**

```javascript
{
    "id": "18fede37617a787649c3f60b9f1f280d"
}
```

**Results posted to the Callback URL:**

```javascript
{
    "id": "18fede37617a787649c3f60b9f1f280d"
    "success": true,
    "file_name": "file.jpg",
    "original_size": 324520,
    "kraked_size": 165358,
    "saved_bytes": 159162,
    "kraked_url": "http://dl.kraken.io/18fede37617a787649c3f60b9f1f280d/file.jpg"
}
```

## Promises

All Kraken.io API methods returns promises and `cb` argument is optional:

```javascript
var Kraken = require('kraken')

var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})

kraken
    .userStatus()
    .then((status) => console.log('Kraken user status:', status))
    .catch((error) =>
        console.error('Error while requesting user status:', error)
    )
```

## Async/Await

All Kraken.io API methods support async/await syntax:

```javascript
var Kraken = require('kraken')

var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})

async function exampleAsynFunction() {
    let result = await kraken.userStatus()
    console.log('Kraken user status:', result)
}

exampleAsynFunction()
```

## Authentication

The first step is to authenticate to Kraken API by providing your unique API Key and API Secret while creating a new Kraken instance:

```javascript
var Kraken = require('kraken')

var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})
```

## Usage - Image URL

To optimize an image by providing image URL use the `kraken.url()` method. You will need to provide two mandatory parameters - `url` to the image and `wait` or `callback_url`:

```javascript
var Kraken = require('kraken')

var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})

var opts = {
    url: 'http://image-url.com/file.jpg',
    wait: true
}

kraken.url(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

Depending on a choosen response option (Wait or Callback URL) in the `data` object you will find either the optimization ID or optimization results containing a `success` property, file name, original file size, kraked file size, amount of savings and optimized image URL:

```javascript
{
    success: true,
    file_name: 'file.jpg',
    original_size: 30664,
    kraked_size: 577,
    saved_bytes: 30087,
    kraked_url: 'http://dl.kraken.io/d1aacd2a2280c2ffc7b4906a09f78f46/file.jpg'
}
```

If no saving were found, the API will return an object containing `"success":true` and will report saved_bytes of 0:

```javascript
{
    success: true,
    saved_bytes: 0,
}
```

## Usage - Image Upload

If you want to upload your images directly to Kraken API use the `kraken.upload()` method. You will need to provide two mandatory parameters - `file` and `wait` or `callback_url`.

`file` parameter have next options:

-   `String` - if file parameter is a string type, then it will be interpreted as a path to file and will be loaded using `fs.createReadStream()` function
-   `Stream` | `Buffer` | `String` - file content, will be generated random filename
-   `Object` with next properties:
    -   _mandatory_ `path` or `value` - if `path` is present, `value` is ignored
    -   `path` - path to file, will be loaded using `fs.createReadStream()` function
    -   `value` - file content, supported types: `Stream` | `Buffer` | `String`
    -   [`filename`] - new file name to be sended to server, this parameter allow to send different file name to server

In the `data` object you will find the same optimization properties as with `url` option above.

```javascript
var Kraken = require('kraken'),
    fs = require('fs')

var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})

var opts = {
    file: 'file.jpg',
    wait: true
}

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

Buffer as file, filename is ommited - it will be random:

```javascript
var opts = {
    file: fs.readFileSync('file.jpg'),
    wait: true
}

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

Stream as file, filename is ommited - it will be random:

```javascript
var opts = {
    file: fs.createReadStream('file.jpg'),
    wait: true
}

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

Object as file options with path parameter:

```javascript
var opts = {
    file: {
        path: 'file.jpg',
        fileName: 'example.jpg'
    },
    wait: true
}

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

Object as file options with buffer as value:

```javascript
var opts = {
    file: {
        value: fs.readFileSync('file.jpg'),
        fileName: 'new_file_name.jpg'
    }
    wait: true
}

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

## Usage - User status

If you want to check your quotas or your account status, you can use [userStatus](https://kraken.io/docs/user-status) which will return something like:

```json
{
    "success": true,
    "active": true,
    "plan_name": "Enterprise",
    "quota_total": 64424509440,
    "quota_used": 313271610,
    "quota_remaining": 64111237830
}
```

```javascript
var Kraken = require('kraken')
var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})
kraken.userStatus(function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success', {
            success: data.success,
            active: data.active,
            quota_total: formatBytes(data.quota_total, 2),
            quota_used: formatBytes(data.quota_used, 2),
            quota_remaining: formatBytes(data.quota_remaining, 2)
        })
    }
}) //formatBytes(data,2)

// Optional function which will format the bytes value
function formatBytes(value, decimal) {
    if (0 == value) return '0 Bytes'
    var c = 1024,
        d = decimal || 2,
        e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        f = Math.floor(Math.log(value) / Math.log(c))
    return parseFloat((value / Math.pow(c, f)).toFixed(d)) + ' ' + e[f]
}
```

## Lossy Optimization

When you decide to sacrifice just a small amount of image quality (usually unnoticeable to the human eye), you will be able to save up to 90% of the initial file weight. Lossy optimization will give you outstanding results with just a fraction of image quality loss.

To use lossy optimizations simply set `lossy: true` in your request:

```javascript
var opts = {
    file: '/path/to/image/file.jpg',
    lossy: true,
    wait: true
}
```

### PNG Images

PNG images will be converted from 24-bit to paletted 8-bit with full alpha channel. This process is called PNG quantization in RGBA format and means the amout of colours used in an image will be reduced to 256 while maintaining all information about alpha transparency.

### JPEG Images

For lossy JPEG optimizations Kraken will generate multiple copies of a input image with a different quality settings. It will then intelligently pick the one with the best quality to filesize ration. This ensures your JPEG image will be at the smallest size with the highest possible quality, without the need for a human to select the optimal image.

## Image Resizing

Image resizing option is great for creating thumbnails or preview images in your applications. Kraken will first resize the given image and then optimize it with its vast array of optimization algorithms. The `resize` option needs a few parameters to be passed like desired `width` and/or `height` and a mandatory `strategy` property. For example:

```javascript
var Kraken = require('kraken')

var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})

var opts = {
    file: '/path/to/image/file.jpg',
    wait: true,
    resize: {
        width: 100,
        height: 75,
        strategy: 'crop'
    }
}

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

The `strategy` property can have one of the following values:

-   `exact` - Resize by exact width/height. No aspect ratio will be maintained.
-   `portrait` - Exact width will be set, height will be adjusted according to aspect ratio.
-   `landscape` - Exact height will be set, width will be adjusted according to aspect ratio.
-   `auto` - The best strategy (portrait or landscape) will be selected for a given image according to aspect ratio.
-   `crop` - This option will crop your image to the exact size you specify with no distortion.

## WebP Compression

WebP is a new image format introduced by Google in 2010 which supports both lossy and lossless compression. According to [Google](https://developers.google.com/speed/webp/), WebP lossless images are **26% smaller** in size compared to PNGs and WebP lossy images are **25-34% smaller** in size compared to JPEG images.

To recompress your PNG or JPEG files into WebP format simply set `"webp": true` flag in your request JSON. You can also optionally set `"lossy": true` flag to leverage WebP's lossy compression:

```javascript
var opts = {
    file: '/path/to/image/file.jpg',
    wait: true,
    webp: true,
    lossy: true
}
```

## Amazon S3 and Rackspace Cloud Files

Kraken API allows you to store optimized images directly in your S3 bucket or Cloud Files container. With just a few additional parameters your optimized images will be pushed to your external storage in no time.

### Amazon S3

**Mandatory Parameters:**

-   `key` - Your unique Amazon "Access Key ID".
-   `secret` - Your unique Amazon "Secret Access Key".
-   `bucket` - Name of a destination container on your Amazon S3 account.
-   `region` - Name of the region your S3 bucket is located in.

**Optional Parameters:**

-   `path` - Destination path in your S3 bucket (e.g. `"images/layout/header.jpg"`). Defaults to root `"/"`.
-   `acl` - Permissions of a destination object. This can be `"public_read"` or `"private"`. Defaults to `"public_read"`.

The above parameters must be passed in a `s3_store` object:

```javascript
var Kraken = require('kraken')

var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})

var opts = {
    file: '/path/to/image/file.jpg',
    wait: true,
    s3_store: {
        key: 'your-amazon-access-key',
        secret: 'your-amazon-secret-key',
        bucket: 'destination-bucket',
        region: 'us-east-1'
    }
}

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

The `data` object will contain `kraked_url` key pointing directly to the optimized file in your Amazon S3 account:

```javascript
{
    kraked_url: 'http://s3.amazonaws.com/YOUR_CONTAINER/path/to/file.jpg'
}
```

### Rackspace Cloud Files

**Mandatory Parameters:**

-   `user` - Your Rackspace username.
-   `key` - Your unique Cloud Files API Key.
-   `container` - Name of a destination container on your Cloud Files account.

**Optional Parameters:**

-   `path` - Destination path in your container (e.g. `"images/layout/header.jpg"`). Defaults to root `"/"`.

The above parameters must be passed in a `cf_store` object:

```javascript
var Kraken = require('kraken')

var kraken = new Kraken({
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
})

var opts = {
    file: '/path/to/image/file.jpg',
    wait: true,
    cf_store: {
        user: 'your-rackspace-username',
        key: 'your-rackspace-api-key',
        container: 'destination-container'
    }
}

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err)
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url)
    }
})
```

If your container is CDN-enabled, the optimization results will contain `kraked_url` which points directly to the optimized file location in your Cloud Files account, for example:

```javascript
kraked_url: 'http://e9ffc04970a269a54eeb-cc00fdd2d4f11dffd931005c9e8de53a.r2.cf1.rackcdn.com/path/to/file.jpg'
```

If your container is not CDN-enabled `kraked_url` will point to the optimized image URL in the Kraken API:

```javascript
kraked_url: 'http://dl.kraken.io/ecdfa5c55d5668b1b5fe9e420554c4ee/file.jpg'
```

## LICENSE - MIT

Copyright (c) 2013 Nekkra UG

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
