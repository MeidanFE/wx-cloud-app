import { fetchOpenid } from "../../utils/user";
import { getTip,countTip } from "../../api/tip";


//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    tips:[],
    pageNo:1,
    pageSize:1,
    hasMore:true,
    count:{
      public:0,
      private:0,
    }
  },
  onLoad() {
    // const {userInfo} = app.globalData;
    // this.setData({
    //   userInfo,
    // })
    // this.getPageTip();
  },
  onShow(){
    const {userInfo} = app.globalData;
    this.setData({
      userInfo,
    })
    this.countTip();
    this.getPageTip(1);
  },
  async onGetUserInfo(e) {
   
    if (e.detail.userInfo) {
      await fetchOpenid();
      this.setData({
        userInfo: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo
    }
  },
  async getPageTip(pageNo=1){
  
    try{
      const {pageSize} = this.data;
      let {list,total}=await getTip(pageNo,pageSize);
      console.log(list)
      this.setData({
        pageNo,
        hasMore:total<pageNo*pageSize,
        tips:list
      })
    }catch(err){
      console.log(err)
      wx.showToast({
        title: '加载动态失败',
        icon:"none"
      })
    }
    
  },
  async countTip(){
  
    try{
      let res =await countTip();
      this.setData({
        count:{
          public:res.public||0,
          private:res.private||0
        }
      })
     
    }catch(err){
      console.log(err)
    }
    
  },
  
})
