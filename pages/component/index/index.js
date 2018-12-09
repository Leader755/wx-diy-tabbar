var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Index'
    }
  },

  /* 组件的初始数据 */
  data: {
    loadFlag: true,
    curr_page: 1,
    pull_loading: false,
    list: [],
    content_waiting_show: false,
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      // 显示设置
      var res = wx.getSystemInfoSync();
      var device = new RegExp("iOS");
      var result = device.test(res.system);
      let tmp = 0;
      let h = res.windowHeight - res.windowWidth / 750 * 116 - tmp;
      this.setData({
        main_height: h,
      });

      //初始化
      this.getIndexData(true)

    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    //首页数据
    getIndexData(first_loading) {
      if (first_loading) {
        this.setData({
          content_waiting_show: false,
        })
      }
      let that = this;
      wx.request({
        url: 'https://api.douban.com/v2/movie/top250',
        method: 'GET',
        header: {
          'content-type': 'json'
        },
        data: {
          start: 1,
          count: 20    // 每次请求的数目
        },
        success: function(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              content_waiting_show: true,
              curr_page: 2
            })
          }
        },
        fail: function(err) {
          console.log(err)
        }
      })
    },

    // 懒加载
    // scrollDown() {
    //   console.log('到底了')
    //   let that = this;
    //   if (this.data.loadFlag) {
    //     this.setData({
    //       pull_loading: true
    //     })
    //     wx.request({
    //       url: 'https://api.douban.com/v2/movie/top250',
    //       method: 'GET',
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded'
    //       },
    //       success: function(res) {
    //         if (res.code == 0) {
    //           console.log(res)
    //           let tempData = that.data.travelIndexData.concat(res.goods);
    //           that.setData({
    //             curr_page: that.data.curr_page + 1,
    //             travelIndexData: tempData,
    //             loadFlag: tempData.length >= parseInt(res.count) ? false : true,
    //             pull_loading: false
    //           })
    //         }
    //       },
    //       fail: function(err) {
    //         console.log(err)
    //       }
    //     })
    //   } else {
    //     return
    //   }
    // }
  }
})