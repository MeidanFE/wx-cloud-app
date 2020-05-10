//app.js
import { fetchOpenid } from "./utils/user.js";

App({
  async onLaunch() {

    this.globalData = {
      openId:'',
      userInfo:{},
      mapKey:'5NQBZ-2V5WS-OXUO6-6HICL-6RZK3-OPFQY'
    }
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'online-meq1l',
        traceUser: true,
      })

      await this.getUserInfo()
    }
  },
  async getUserInfo() {
    // 获取用户信息
   let {authSetting} =  await wx.getSetting()

   if(authSetting['scope.userInfo']){
    this.globalData.userInfo = (await wx.getUserInfo()).userInfo;
    console.log(getApp().globalData.userInfo)
    await fetchOpenid();
   };
  },
})
