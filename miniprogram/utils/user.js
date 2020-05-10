import { login } from "../api/user.js";

export const fetchOpenid = async ()=> {
  // 调用云函数
 login().then(res=>{
    console.log('[云函数] [login] user openid: ', res.openid)
    app.globalData.openid = res.openid
  }).catch(err=>{
    console.error('[云函数] [login] 调用失败', err)
  });
};