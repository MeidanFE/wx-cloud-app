// miniprogram/pages/create/create.js
const chooseLocation = requirePlugin('chooseLocation');
import { createTip } from "../../api/tip.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    form:{
      address:"",
      lat:0.0,
      lng:0.0,
      content:"",
      images:[]
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
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const {form} = this.data;
    if(!form.lng){
      this.getCurrentLocation();
    }
    
    const location = chooseLocation.getLocation(); 
    // console.log(location)
    if(location!=null){
      this.setData({
        "form.address":location.name,
        "form.lat":location.latitude,
        "form.lng":location.longitude,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log("onUnload")
  },
  getCurrentLocation(){
    wx.getLocation({
      type: 'wgs84',
      success: (res)=> {
        const {latitude,longitude} = res;
        
        this.setData({
          "form.lat":latitude,
          "form.lng":longitude
        })
        // const latitude = res.latitude    // 纬度，范围为 -90~90，负数表示南纬
        // const longitude = res.longitude  // 经度，范围为 -180~180，负数表示西经
        // const speed = res.speed          // 速度，单位 m/s
        // const accuracy = res.accuracy    // 位置的精确度
      }
     })
  },
  navigateToLocation(){
    
    const key = '5NQBZ-2V5WS-OXUO6-6HICL-6RZK3-OPFQY'; //使用在腾讯位置服务申请的key
    const referer = 'Simon-小程序'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: this.data.form.lat,
      longitude: this.data.form.lng
    });
    const category = '生活服务,娱乐休闲';
    
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
  },
  handleFieldChange(e){
    console.log(e)
    const {value} = e.detail;
    const {key} = e.target.dataset;
    this.setData({
      [key]:value
    })
  },
  async handleSubmit(){

    const uploadTasks = tempFiles.map(file=> {
      const cloudPath = uuid() + file.tempFilePath.match(/\.[^.]+?$/)[0]
      return wx.cloud.uploadFile({
        cloudPath,
        filePath:file.tempFilePath, // 文件路径
      })
    })

    let uploadRes =  await Promise.all(uploadTasks)    

    let {images} = this.properties;
    images = images.concat(tempFiles.map((img,idx)=>{
      img.fileID = uploadRes[idx].fileID;
      return img;
    }))
  
    createTip(this.data.form)
  }
})