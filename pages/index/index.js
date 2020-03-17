Page({
  data: {
    base64: '',
  },

  get() {
    const that = this;
    that.selectComponent('#myComponent').getBase64({
      success: (res) => {
        that.setData({ base64: res });
      },
    });
  },

  clear() {
    this.selectComponent('#myComponent').clear();
    this.setData({ base64: '' });
  },
});
