## ✨signature

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
|getFilePath|获取画布的本地链接地址，可以使用 wx.uploadFile 将本地链接地址以 form-data 的形式提交给后端进行存储|function|-|
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

## ✨link

> 类似 React.router.link 的功能，用于页面跳转

### wxml-API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|to|前往的地址|string|''|
|block|是否为块级元素|boolean|false|
|allow|是否允许跳转|boolean|true|
|ry-class|样式类|string|''|
|bind:before|跳转前执行的函数|function|-|

## ✨table

> 展示行列数据

- [demo](https://github.com/long-zhuge/miniApp/tree/master/pages/table)

### API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|columns|表格列的配置描述，具体项见下表|array|[]|
|dataSource|数据数组|array|[]|

### Column

> 列描述数据对象，是 columns 中的一项

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|title|列头显示文字|string|-|
|dataIndex|列数据在数据项中对应的 key|string|-|