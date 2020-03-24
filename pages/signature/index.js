Page({
  data: {
    text: '',
  },

  getBase64() {
    const that = this;
    that.selectComponent('#myComponent').getBase64({
      success: (res) => {
        that.setData({ text: res });
      },
    });
  },

  getFilePath() {
    const that = this;
    that.selectComponent('#myComponent').getFilePath({
      success: (res) => {
        that.setData({ text: res });
      },
    });
  },

  clear() {
    this.selectComponent('#myComponent').clear();
    this.setData({ text: '' });
  },
});
