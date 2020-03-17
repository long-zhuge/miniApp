/*
* canvas的签名板组件
* PS: 请在调用的页面关闭上下滑动功能，在 json 文件中增加 "disableScroll": true
* API: {
*   canvasId(String): 'signature_canvas', // 画布的ID
*   width(Number), // 画布的宽度，默认获取设备的屏幕宽度
*   height(Number): 300, // 画布的高度，默认 300px
*
    // 父组件调用获取 base64码
    this.selectComponent('#myComponent').getBase64({
      success: (res) => {
        console.log(res);
      },
      fail: () => {},
    });

    // 清除
    this.selectComponent('#myComponent').clear();

    // index.wxml
    <signature id="myComponent" />
* }
* */
const upng = require('./UPNG.js');

Component({
  // 组件的属性
  properties: {
    canvasId: {
      type: String,
      value: 'signature_canvas'
    },
    width: {
      type: Number,
      value: wx.getSystemInfoSync().windowWidth,
    },
    height: {
      type: Number,
      value: 200,
    },
  },

  // 组件内部状态值
  data: {
    context: null, // canvas 对象
    isValue: false, // 当前画布上是否有值
  },

  // 组件所在页面的生命周期
  pageLifetimes: {
    show() {
      /*
      * 初始化获取 canvas 对象
      * 在自定义组件中，createCanvasContext 方法必须传入当前组件的 this 对象，否则无法正确获取画布
      * */
      const context = wx.createCanvasContext(this.data.canvasId, this);
      this.setData({
        context: context
      });
      context.draw()
    }
  },

  // 组件事件
  methods: {
    // 记录开始点
    bindtouchstart: function(e) {
      this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
      this.setData({ isValue: true });
    },

    // 记录移动点，刷新绘制
    bindtouchmove: function(e) {
      this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
      this.data.context.stroke();
      this.data.context.draw(true);
      this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    },

    // 获取图片的 base64 码
    getBase64(params = {}) {
      const {
        success = () => {},
        fail = () => {},
      } = params;
      if (this.data.isValue) {
        wx.canvasGetImageData({
          canvasId: this.data.canvasId,
          x: 0,
          y: 0,
          width: this.data.width,
          height: this.data.height,
          success (res) {
            let pngData = upng.encode([res.data.buffer], res.width, res.height);
            let bs64 = wx.arrayBufferToBase64(pngData);
            success('data:image/jpg;base64,' + bs64);
          },
          fail(e) { fail(e) },
        }, this); // 自定义组件中，必须传入当前组件的 this 对象
      } else {
        wx.showToast({
          icon: 'none',
          title: '请签名',
        })
      }
    },

    // 清除内容
    clear() {
      this.data.context.draw();
      this.setData({ isValue: false });
    },
  }
});
