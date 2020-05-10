// miniprogram/pages/create/create.js
const chooseLocation = requirePlugin('chooseLocation');
import {reverseGeocoder} from "../../utils/mapSDK";  

import { createTip } from "../../api/tip.js";
import uuid from "../../utils/uuid.js";
import {colors} from "../../utils/constants";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors,
    form:{
      address:"",
      lat:0.0,
      lng:0.0,
      content:"",
      images:[],
      color:"red",
      scoped:"公开"
    },
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
  async getCurrentLocation(){

   let {result} = await reverseGeocoder({});
 
   this.setData({
      "form.lat":result.location.lat,
      "form.lng":result.location.lng,
      "form.address":result.address
   })
    
    // const latitude = res.latitude    // 纬度，范围为 -90~90，负数表示南纬
    // const longitude = res.longitude  // 经度，范围为 -180~180，负数表示西经
    // const speed = res.speed          // 速度，单位 m/s
    // const accuracy = res.accuracy    // 位置的精确度
   
  },
  navigateToLocation(){
    
    const key = app.globalData.mapKey; //使用在腾讯位置服务申请的key
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
  
    const {value} = e.detail;
    const {key} = e.target.dataset;
    this.setData({
      [key]:value
    })
  },
  async handleSubmit(){
    const {userInfo,openId} = app.globalData;
    if(!openId || !userInfo.nickName){
     
      wx.switchTab({
        url: '/pages/me/me',
        success:()=>{
          wx.showToast({
            title: '请登录',
            icon:"none"
          })
        }
      })
      
      return;
    }

    const {images:tempFilesPath,scoped,...rest} = this.data.form;

    const uploadTasks = tempFilesPath.map(filePath=> {
      const cloudPath = uuid() + filePath.match(/\.[^.]+?$/)[0]
      return wx.cloud.uploadFile({
        cloudPath,
        filePath, // 文件路径
      })
    })

    let uploadRes =  await Promise.all(uploadTasks)    

    let {images} = this.properties;
    images = uploadRes.map((img)=>{
      return img.fileID;
    })
  
    await createTip({
      ...rest,
      images,
      scoped:{
        "公开":"public",
        "悄悄话":"private",
      }[scoped]
    })

    wx.switchTab({
      url: '/pages/me/me',
    })
  },
  handleTipColorChange(e){
    const {color}=e.target.dataset;
    this.setData({
      "form.color":color
    })
  },
  async showScopedPicker(){
    const ops = ["公开","悄悄话"];
    try{
      const {tapIndex} = await wx.showActionSheet({
        itemList: ops,
      })
      
      this.setData({
        "form.scoped":ops[tapIndex]
      })
    }catch(err) {
      console.log(res.errMsg)
    }
  }
})