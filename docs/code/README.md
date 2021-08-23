## Classes

<dl>
<dt><a href="#Kraken">Kraken</a></dt>
<dd><p>Kraken (name)</p>
</dd>
<dt><a href="#AxiosOptions">AxiosOptions</a></dt>
<dd></dd>
<dt><a href="#AxiosOptions">AxiosOptions</a></dt>
<dd></dd>
<dt><a href="#KrakenApiData">KrakenApiData</a></dt>
<dd></dd>
<dt><a href="#KrakenApiData">KrakenApiData</a></dt>
<dd></dd>
<dt><a href="#KrakenApiList">KrakenApiList</a></dt>
<dd></dd>
<dt><a href="#KrakenApiList">KrakenApiList</a></dt>
<dd></dd>
<dt><a href="#KrakenAuth">KrakenAuth</a></dt>
<dd></dd>
<dt><a href="#KrakenResponse">KrakenResponse</a></dt>
<dd></dd>
<dt><a href="#KrakenResponse">KrakenResponse</a></dt>
<dd></dd>
<dt><a href="#KrakenUploadData">KrakenUploadData</a> ⇐ <code>FormData</code></dt>
<dd></dd>
<dt><a href="#KrakenUploadData">KrakenUploadData</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FileOptions">FileOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FileDetails">FileDetails</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#UploadOptions">UploadOptions</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Kraken"></a>

## Kraken
Kraken (name)

**Kind**: global class  

* [Kraken](#Kraken)
    * [new Kraken(auth)](#new_Kraken_new)
    * [.upload(options, cb)](#Kraken+upload) ⇒ [<code>Promise.&lt;KrakenResponse&gt;</code>](#KrakenResponse)
    * [.url(options, cb)](#Kraken+url) ⇒ <code>any</code>

<a name="new_Kraken_new"></a>

### new Kraken(auth)
Constructs a new Kraken instance


| Param | Type | Description |
| --- | --- | --- |
| auth | <code>object</code> | Kraken API key and secret |

<a name="Kraken+upload"></a>

### kraken.upload(options, cb) ⇒ [<code>Promise.&lt;KrakenResponse&gt;</code>](#KrakenResponse)
Upload file to Kraken.io API

**Kind**: instance method of [<code>Kraken</code>](#Kraken)  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| cb | <code>function</code> | <code></code> | 

<a name="Kraken+url"></a>

### kraken.url(options, cb) ⇒ <code>any</code>
Krak image via URL

**Kind**: instance method of [<code>Kraken</code>](#Kraken)  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>any</code> |  | 
| cb | <code>any</code> | <code></code> | 

<a name="AxiosOptions"></a>

## AxiosOptions
**Kind**: global class  

* [AxiosOptions](#AxiosOptions)
    * [new AxiosOptions()](#new_AxiosOptions_new)
    * [new AxiosOptions(defaults, options)](#new_AxiosOptions_new)

<a name="new_AxiosOptions_new"></a>

### new AxiosOptions()
Provides options processing for axios

<a name="new_AxiosOptions_new"></a>

### new AxiosOptions(defaults, options)
Constructs a new AxiosOptions instance


| Param | Type | Description |
| --- | --- | --- |
| defaults | <code>object</code> | Default options |
| options | <code>object</code> | New options |

<a name="AxiosOptions"></a>

## AxiosOptions
**Kind**: global class  

* [AxiosOptions](#AxiosOptions)
    * [new AxiosOptions()](#new_AxiosOptions_new)
    * [new AxiosOptions(defaults, options)](#new_AxiosOptions_new)

<a name="new_AxiosOptions_new"></a>

### new AxiosOptions()
Provides options processing for axios

<a name="new_AxiosOptions_new"></a>

### new AxiosOptions(defaults, options)
Constructs a new AxiosOptions instance


| Param | Type | Description |
| --- | --- | --- |
| defaults | <code>object</code> | Default options |
| options | <code>object</code> | New options |

<a name="KrakenApiData"></a>

## KrakenApiData
**Kind**: global class  

* [KrakenApiData](#KrakenApiData)
    * [new KrakenApiData()](#new_KrakenApiData_new)
    * [new KrakenApiData(kraken, options)](#new_KrakenApiData_new)
    * [.toJson()](#KrakenApiData+toJson) ⇒ <code>string</code>

<a name="new_KrakenApiData_new"></a>

### new KrakenApiData()
Provides kraken API data processing

<a name="new_KrakenApiData_new"></a>

### new KrakenApiData(kraken, options)
Constructs a new KrakenApiData instance


| Param | Type | Description |
| --- | --- | --- |
| kraken | [<code>Kraken</code>](#Kraken) | Kraken instance |
| options | <code>any</code> | Kraken API options |

<a name="KrakenApiData+toJson"></a>

### krakenApiData.toJson() ⇒ <code>string</code>
Convert this object to JSON string

**Kind**: instance method of [<code>KrakenApiData</code>](#KrakenApiData)  
<a name="KrakenApiData"></a>

## KrakenApiData
**Kind**: global class  

* [KrakenApiData](#KrakenApiData)
    * [new KrakenApiData()](#new_KrakenApiData_new)
    * [new KrakenApiData(kraken, options)](#new_KrakenApiData_new)
    * [.toJson()](#KrakenApiData+toJson) ⇒ <code>string</code>

<a name="new_KrakenApiData_new"></a>

### new KrakenApiData()
Provides kraken API data processing

<a name="new_KrakenApiData_new"></a>

### new KrakenApiData(kraken, options)
Constructs a new KrakenApiData instance


| Param | Type | Description |
| --- | --- | --- |
| kraken | [<code>Kraken</code>](#Kraken) | Kraken instance |
| options | <code>any</code> | Kraken API options |

<a name="KrakenApiData+toJson"></a>

### krakenApiData.toJson() ⇒ <code>string</code>
Convert this object to JSON string

**Kind**: instance method of [<code>KrakenApiData</code>](#KrakenApiData)  
<a name="KrakenApiList"></a>

## KrakenApiList
**Kind**: global class  

* [KrakenApiList](#KrakenApiList)
    * [new KrakenApiList()](#new_KrakenApiList_new)
    * [new KrakenApiList(url, methods)](#new_KrakenApiList_new)

<a name="new_KrakenApiList_new"></a>

### new KrakenApiList()
Provides Kraken API methods list

<a name="new_KrakenApiList_new"></a>

### new KrakenApiList(url, methods)
Constructs a new KrakenApiList instance. Basicaly just list of object props with url to method.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> | <code>&quot;KrakenApiList.default.url&quot;</code> | Kraken API URL |
| methods | <code>object</code> | <code>KrakenApiList.default.methods</code> | Methods lists object in format [method]: 'path/to/method' |
| methods.methodname | <code>string</code> |  | 'method': '/v/path' |

<a name="KrakenApiList"></a>

## KrakenApiList
**Kind**: global class  

* [KrakenApiList](#KrakenApiList)
    * [new KrakenApiList()](#new_KrakenApiList_new)
    * [new KrakenApiList(url, methods)](#new_KrakenApiList_new)

<a name="new_KrakenApiList_new"></a>

### new KrakenApiList()
Provides Kraken API methods list

<a name="new_KrakenApiList_new"></a>

### new KrakenApiList(url, methods)
Constructs a new KrakenApiList instance. Basicaly just list of object props with url to method.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> | <code>&quot;KrakenApiList.default.url&quot;</code> | Kraken API URL |
| methods | <code>object</code> | <code>KrakenApiList.default.methods</code> | Methods lists object in format [method]: 'path/to/method' |
| methods.methodname | <code>string</code> |  | 'method': '/v/path' |

<a name="KrakenAuth"></a>

## KrakenAuth
**Kind**: global class  
<a name="new_KrakenAuth_new"></a>

### new KrakenAuth(key, secret)
Constructs a new KrakenAuth instance


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Kraken.io API key |
| secret | <code>string</code> | Kraken.io API secret |

<a name="KrakenResponse"></a>

## KrakenResponse
**Kind**: global class  

* [KrakenResponse](#KrakenResponse)
    * [new KrakenResponse()](#new_KrakenResponse_new)
    * [new KrakenResponse(data)](#new_KrakenResponse_new)

<a name="new_KrakenResponse_new"></a>

### new KrakenResponse()
Just a container for Kraken API response data

<a name="new_KrakenResponse_new"></a>

### new KrakenResponse(data)
Constructs a new KrakenResponse instance


| Param | Type |
| --- | --- |
| data | <code>\*</code> | 

<a name="KrakenResponse"></a>

## KrakenResponse
**Kind**: global class  

* [KrakenResponse](#KrakenResponse)
    * [new KrakenResponse()](#new_KrakenResponse_new)
    * [new KrakenResponse(data)](#new_KrakenResponse_new)

<a name="new_KrakenResponse_new"></a>

### new KrakenResponse()
Just a container for Kraken API response data

<a name="new_KrakenResponse_new"></a>

### new KrakenResponse(data)
Constructs a new KrakenResponse instance


| Param | Type |
| --- | --- |
| data | <code>\*</code> | 

<a name="KrakenUploadData"></a>

## KrakenUploadData ⇐ <code>FormData</code>
**Kind**: global class  
**Extends**: <code>FormData</code>  

* [KrakenUploadData](#KrakenUploadData) ⇐ <code>FormData</code>
    * [new KrakenUploadData()](#new_KrakenUploadData_new)
    * [new KrakenUploadData(kraken, options)](#new_KrakenUploadData_new)

<a name="new_KrakenUploadData_new"></a>

### new KrakenUploadData()
KrakenUploadData processing a data for uploading.

<a name="new_KrakenUploadData_new"></a>

### new KrakenUploadData(kraken, options)
Constructs a new instance of KrakenUploadData and process options for uploading.


| Param | Type | Description |
| --- | --- | --- |
| kraken | [<code>Kraken</code>](#Kraken) | The kraken object instance |
| options | [<code>UploadOptions</code>](#UploadOptions) | The upload options [UploadOptions](#UploadOptions)     * |

<a name="KrakenUploadData"></a>

## KrakenUploadData
**Kind**: global class  

* [KrakenUploadData](#KrakenUploadData)
    * [new KrakenUploadData()](#new_KrakenUploadData_new)
    * [new KrakenUploadData(kraken, options)](#new_KrakenUploadData_new)

<a name="new_KrakenUploadData_new"></a>

### new KrakenUploadData()
KrakenUploadData processing a data for uploading.

<a name="new_KrakenUploadData_new"></a>

### new KrakenUploadData(kraken, options)
Constructs a new instance of KrakenUploadData and process options for uploading.


| Param | Type | Description |
| --- | --- | --- |
| kraken | [<code>Kraken</code>](#Kraken) | The kraken object instance |
| options | [<code>UploadOptions</code>](#UploadOptions) | The upload options [UploadOptions](#UploadOptions)     * |

<a name="FileOptions"></a>

## FileOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| header | <code>String</code> \| <code>Object</code> | Header or headers |
| knownLength | <code>Number</code> | File known length |
| filename | <code>String</code> | File name |
| filepath | <code>String</code> | File path |
| contentType | <code>String</code> | Content type |

<a name="FileDetails"></a>

## FileDetails : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>String</code> \| <code>Stream</code> \| <code>Buffer</code> | Path to file or file data |
| options | [<code>FileOptions</code>](#FileOptions) | File options [FileOptions](#FileOptions) |

<a name="UploadOptions"></a>

## UploadOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| file | <code>String</code> \| [<code>FileDetails</code>](#FileDetails) | Path to file or file details [FileDetails](#FileDetails) |

