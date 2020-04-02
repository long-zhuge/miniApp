Page({
  data: {
    visible: false,
  },

  show() {
    this.setData({ visible: !this.data.visible });
  },

  onOk({ detail }) {
    console.log(detail);
  }
});
