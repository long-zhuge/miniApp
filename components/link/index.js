/*
* 类似 router-link 的功能
* API: {
*   to: 要跳转的地址
*   block: 是否为块级元素
*   ry-class: 样式类
*   bind:before: 跳转前的回调函数
*   allow: 是否允许跳转
* }
* */

Component({
  // 额外的样式类
  externalClasses:['ry-class'],

  // 组件的属性
  properties: {
    to: {
      type: String,
      value: ''
    },
    block: {
      type: Boolean,
      value: false,
    },
    allow: {
      type: Boolean,
      value: true
    },
  },
  // 组件事件
  methods: {
    goto: function () {
      this.triggerEvent('before');
      if (this.data.allow) {
        wx.navigateTo({
          url: this.data.to,
        })
      }
    },
  }
});
