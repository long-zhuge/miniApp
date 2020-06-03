import { chartInit } from '../../utils/index';

Page({
  data: {
    opts: {
      lazyLoad: true
    },
    list: [
      {
        key: '2020-06-02',
        value: 200,
      }, {
        key: '2020-06-01',
        value: 190,
      }, {
        key: '2020-05-31',
        value: 180,
      }, {
        key: '2020-05-30',
        value: 200,
      }, {
        key: '2020-05-29',
        value: 137,
      }, {
        key: '2020-05-28',
        value: 167,
      }, {
        key: '2020-05-27',
        value: 345,
      },
    ]
  },

  onReady() {
    chartInit(this, this.data.list, '#canvas');
  }
});