// 数据删除操作
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

// 简单的拷贝 json 数据
export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// 图表x轴如果未时间，则进行切割展示。
export const chartTickCount = (data = []) => {
  if (data.length > 0) {
    if (data[0].key.includes('年') && data.length > 6) {
      return data.length / 2;
    }

    return data.length;
  }

  return 0;
};

/*
* 图表初始化函数：柱状图、折线图
* API: {
*   that: 当前组件的 this 对象，用于获取 wxml 中的 canvas 对象
*   data: 图表渲染的数据源
*   id: canvas 的 id，如：#canvas
*   isLine: 是否展示成折线图
* }
* */
export const chartInit = (that, data = [], id = '', isLine) => {
  const chartComponent = that.selectComponent(id);
  // init 的 4个参数是固定的，请不要修改。
  chartComponent.init((canvas, width, height, F2) => {
    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
      padding: [25, 0, 50, 25],
      // animate: false // 关闭动画
    });

    chart.source(data, {
      // 此处的 key 表示x轴需要展示的字段
      key: {
        tickCount: chartTickCount(data),
      }
    });

    chart.tooltip({
      showItemMarker: false,
      onShow({ items }) {
        items[0].name = items[0].title;
      }
    });

    // 坐标轴文本旋转
    chart.axis('key', {
      labelOffset: 10,
      label(text) {
        return {
          rotate: Math.PI/8, // 设置旋转角度
          text: text.includes('年') ? text : (text.length <= 5 ? text : `${text.substring(0, 5)}...`),
        }
      },
    });

    if (isLine) {
      // 折线图
      chart.line().position('key*value');
      chart.point().position('key*value').style({
        stroke: '#fff',
        lineWidth: 1
      });
    } else {
      // 柱形图
      chart.interval().size(11).position('key*value');
    }
    chart.render();
    return chart;
  })
};

// 判断列表数据是否为空。如果有数据，则值是否都为0
export const getListBool = (list = []) => {
  if (list.length > 0) {
    return list.some(item => (item.value > 0));
  }

  return false;
};

// 希望总能预期的返回想要的数据
export const getStorageSyncType = (storageName = '', defaultResult = {}) => {
  const data = wx.getStorageSync(storageName);

  return data !== '' ? data : defaultResult;
};