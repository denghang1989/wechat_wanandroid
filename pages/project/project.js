// pages/project/project.js

var appInst = getApp();
var baseUrl = appInst.globalData.baseUrl;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    number: 1,
    tabs: [],
    current: 0
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleChange: function ({ detail }) {
    this.setData({
      current: detail.key
    })
  },

  initData: function () {
    var that = this;
    http.getTabs(function (result) {
      that.setData({
        tabs: result.data,
        current: result.data[0].id
      });

      http.getItemList(that.data.number, that.data.current, function (data) {
        var itemListData = data.data.datas.map((item,index,array)=>{
          var desc = item.desc.slice(0,60);
          item.simpleDesc = desc;
          return item;
        })
        that.setData({
          number: that.data.number + 1,
          itemList: data.data.datas
        })
      })
    })
  }
});

var http = {
  getTabs: function (callback) {
    wx.request({
      url: baseUrl + '/project/tree/json',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: ({ data }) => {
        callback(data);
      },
      fail: () => { },
      complete: () => { }
    });
  },

  getItemList: function (number, cid, callback) {
    wx.request({
      url: baseUrl + `project/list/${number}/json?cid=${cid}`,
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: ({ data }) => {
        callback(data);
      },
      fail: () => { },
      complete: () => { }
    });
  }

}
