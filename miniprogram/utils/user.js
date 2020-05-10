import { login } from "../api/user.js";

export const fetchOpenid = async ()=> {
  // 调用云函数
  try{
    const {openId} = await login();
    getApp().globalData.openId = openId;
  }catch(err){
    console.error('[云函数] [login] 调用失败', err)
  }
};