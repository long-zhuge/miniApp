Page({
  data: {
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '性别',
        dataIndex: 'sex',
      }, {
        title: '年龄',
        dataIndex: 'age',
      }, {
        title: '地址',
        dataIndex: 'address',
      }, {
        title: '邮箱',
        dataIndex: 'email',
      }
    ],
    dataSource: [
      {
        name: '马尔扎哈',
        sex: '男',
        age: '18岁',
        address: '虚空',
        email: '-'
      }, {
        name: '提莫',
        sex: '男',
        age: '50岁',
        address: '班德尔城',
        email: '-'
      }, {
        name: '卢锡安',
        sex: '男',
        age: '20岁',
        address: '居无定所',
        email: '-'
      },
    ],
  },
});