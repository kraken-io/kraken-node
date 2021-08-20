## Classes

<dl>
<dt><a href="#KrakenUploadData">KrakenUploadData</a></dt>
<dd><p>KrakenUploadData (name)</p>
</dd>
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

<a name="KrakenUploadData"></a>

## KrakenUploadData
KrakenUploadData (name)

**Kind**: global class  
<a name="new_KrakenUploadData_new"></a>

### new KrakenUploadData(kraken, options)
Constructs a new instance of KrakenUploadData and process options for uploading.


| Param | Type | Description |
| --- | --- | --- |
| kraken | <code>Kraken</code> | The kraken object isntance |
| options | [<code>UploadOptions</code>](#UploadOptions) | The upload options [UploadOptions](#UploadOptions) |

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
| value | <code>String</code> \| <code>Stream</code> \| <code>Buffer</code> | Path to file or fiel data |
| options | [<code>FileOptions</code>](#FileOptions) | File options [FileOptions](#FileOptions) |

<a name="UploadOptions"></a>

## UploadOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| file | <code>String</code> \| [<code>FileDetails</code>](#FileDetails) | Path to file or file details [FileDetails](#FileDetails) |

