//index.js
//获取应用实例
const app = getApp()
const articleList = require('./articleList.js');

Page({
  data: {
    articleList:articleList.data
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  requestArticle(){
    
  },
  onLoad: function () {
    this.requestArticle();
  
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
