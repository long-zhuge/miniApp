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
    visible: {
      type: Boolean,
      value: false
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
    _bindtouchstart: function(e) {
      this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
      this.setData({ isValue: true });
    },

    // 记录移动点，刷新绘制
    _bindtouchmove: function(e) {
      this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
      this.data.context.stroke();
      this.data.context.draw(true);
      this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    },

    // 签名的非空校验
    _check() {
      if (this.data.isValue) {
        return true;
      } else {
        wx.showToast({
          icon: 'none',
          title: '请签名',
        });
        return false;
      }
    },

    // 清除内容
    _onClear() {
      this.data.context.draw();
      this.setData({ isValue: false });
    },

    // 关闭的回调函数
    onCancel() {
      this.triggerEvent('onCancel');
    },

    // 确定的回调函数
    onOk() {
      const that = this;
      if (that._check()) {
        wx.canvasToTempFilePath({
          canvasId: that.data.canvasId,
          x: 0,
          y: 0,
          width: that.data.width - 32,
          height: that.data.height,
          success (res) {
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePath,
              encoding: 'base64',
              success: (base64Res) => {
                that.triggerEvent('onOk', {
                  filePath: res.tempFilePath,
                  base64: base64Res.data,
                });
              }
            }, that);
          },
        }, that); // 自定义组件中，必须传入当前组件的 this 对象
      }
    },
  }
});
