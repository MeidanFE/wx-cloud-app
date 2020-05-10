exports.login = [
  async (ctx) => {
    // 可执行其他自定义逻辑
    // console.log 的内容可以在云开发云函数调用日志查看
    ctx.body = {
      event:ctx.event,
      ...ctx.globalData
    };
  }
]