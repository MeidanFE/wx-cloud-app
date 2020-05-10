import QQMapWX from "../libs/qqmap-wx-jssdk.min.js"; 

const qqmapsdk = new QQMapWX({
  key: getApp().globalData.mapKey
});

export const reverseGeocoder = (ops)=> {
  const {success,fail,complete,...rest} = ops

  return new Promise((resolve,reject)=>{
    qqmapsdk.reverseGeocoder({
      ...rest,
      success:(res)=> {
        resolve(res);
      },
      fail:(err)=> {
        reject(err);
      },
    })
  })
  
};