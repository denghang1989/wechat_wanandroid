// pages/home/home.js
var appInst = getApp();
var baseUrl = appInst.globalData.baseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    imgUrls: [],
    pageNum: 0,
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
    this.setData({ pageNum: 0 });
    this.initData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getItemList(this.data.pageNum,(dataList)=>{
      let list = this.data.itemList.concat(dataList);
      this.setData({
        itemList:list
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  initData: function () {
    this.getBanner();
    this.getItemList(this.data.pageNum, (dataList) => {
      this.setData({
        itemList: dataList,
        pageNum: this.data.pageNum + 1
      })
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    });
  },

  getItemList: function (number, callback) {
    wx.request({
      url: baseUrl + `article/list/${number}/json`,
      method: 'GET',
      success: (result) => {
        var dataList = result.data.data.datas;
        callback(dataList);
      }
    });
  },

  getBanner: function () {
    wx.request({
      url: baseUrl + '/banner/json',
      method: 'GET',
      success: (result) => {
        this.setData({
          imgUrls: result.data.data
        })
      }
    });

  }
})