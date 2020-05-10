/**
 *  获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
 */
module.exports = (ops)=> async (ctx, next) => {
    const {cloud} = ops;
    const wxContext = cloud.getWXContext()
    const log = cloud.logger()
    log.info({
      name: '环境',
      attributes: {
        env: wxContext.ENV,
      },
    })

    ctx.globalData = {
      openId: wxContext.OPENID,
      appId: wxContext.APPID,
      unionId: wxContext.UNIONID,
      env: wxContext.ENV,
    };
    
    for(let key in ops){
      ctx[key] = ops[key];
    }

    await next(); // 执行下一中间件
}