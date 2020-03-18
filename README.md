## signature

> canvas 的签名版，一般用于有效身份的信息录入，合同签署等。

- [demo](https://github.com/long-zhuge/miniApp/tree/master/pages/signature)

### wxml-API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|canvasId|画布id|string|'signature_canvas'|
|width|画布宽度|number|wx.getSystemInfoSync().windowWidth，设备可用宽度|
|height|画布高度|number|200|

### js-API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|getBase64|将画布内容转为base64|function|-|
|getFilePath|获取画布的本地链接地址|function|-|
|clear|清除画布|function|-|

#### getBase64

```
getBase64({
  success: (res) => {},
  fail: (error) => {},
})
```

#### getFilePath

```
getFilePath({
  success: (res) => {},
  fail: (error) => {},
})
```
