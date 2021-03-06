// miniprogram/pages/index/index.js
import Notify from '../dist/notify/notify.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newGroupModel:false,
    groupName:''
  },
  showNewGroupModel(){
    this.setData({
      newGroupModel:true
    })
  },
  closeDialog() {
    this.setData({
      newGroupModel:false
    })
  },
  onGroupNameChange(event){
    console.log(event)
    this.setData({
      groupName:event.detail
    })
  },
  creatGroup(){
    let self = this
    if(self.data.groupName === ''){
      Notify({
        text:'起个名字吧',
        duration:1500,
        selector:'#notify-selector',
        backgroundColor:'#dc3545'
      })
      self.setData({
        newGroupModel:true
      })
      self.selectComponent('#new-group-model').stopLoading()
      return
    }else{
      wx.cloud.callFunction({
        name:'createGroup',
        data:{
          groupName:self.data.groupName
        },
        success(res){
          self.setData({
            newGroupModel:false,
            groupName:''
          })
          Notify({
            text:'新建成功',
            duration:1500,
            selector:'#notify-selector',
            backgroundColor:'#28a745'
          })
        },
        fail(error){
          console.log(error)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})