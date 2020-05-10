/**
 *  获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
 */
module.exports = (ops)=> async (ctx, next) => {
    const {cloud} = ops;
    const wxContext = cloud.getWXContext()
    ctx.globalData = {
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      env: wxContext.ENV,
    };
    for(let key in ops){
      ctx[key] = ops[key];
    }

    await next(); // 执行下一中间件
}