const app = getApp();

export const router = (path,data)=>request({name:"router",path,data});

export default function request({name,path,data}){
  console.log(name,path,data)

  wx.showLoading()

  return new Promise(function(resolve,reject){

    const {userInfo} = app.globalData;

    wx.cloud.callFunction({
      // 云函数名称
      name: name,
      // 传给云函数的参数
      data: {
        $url: path,
        ...data,
        userInfo
      },
      success: function(res) {
        resolve(res.result || {}) 
        
      },
      fail: function(err) {
        reject(err) 
      },
      complete:()=>{
        wx.hideLoading()
      }
    });
  })
  
}