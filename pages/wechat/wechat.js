// pages/wechat/wechat.js

var appInst = getApp();
var baseUrl = appInst.globalData.baseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    tabs: [],
    number: 0,
    itemList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.setData({
      number: 1
    });
    this.initData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    http.getItemList(this.data.current, this.data.number, (data) => {
      var itemLists = that.data.itemList.concat(data.datas);
      that.setData({
        itemList: itemLists
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleChange: function ({ detail }) {
    this.setData({
      current: detail.key,
      number: 1
    });

    http.getItemList(this.data.current, this.data.number, (data) => {
      this.setData({
        itemList:data.datas
      })
    })
  },

  initData: function () {
    var that = this;
    http.getTabsList(function (tabs) {
      that.setData({
        tabs: tabs,
        current: tabs[0].id
      });

      http.getItemList(that.data.current, that.data.number, function (data) {
        that.setData({
          itemList: data.datas,
          number: that.data.number + 1
        })
      })
    });
  }
})

var http = {
  //wxarticle/list/${chapterId}/1/json
  getItemList: function (current, number, callback) {
    wx.request({
      url: baseUrl + `wxarticle/list/${current}/${number}/json`,
      method: 'GET',
      success: (result) => {
        var itemList = result.data.data;
        callback(itemList);
      },
      fail: () => { },
      complete: () => { }
    });
  },

  getTabsList: function (callback) {
    wx.request({
      url: baseUrl + '/wxarticle/chapters/json',
      method: 'GET',
      success: (result) => {
        var tabs = result.data.data;
        callback(tabs);
      },
      fail: () => { },
      complete: () => { }
    });
  }
}
