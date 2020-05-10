exports.login = [
  async (ctx) => {

    const {
      db,event,
    } = ctx;
    const _ = db.command;
    const {userInfo} = event;

    const {data} = await db.collection('user').where({
      openId:ctx.globalData.openId
    }).get()


    if(!data.length){
      await db.collection('user').add({
        data:{
          openId:ctx.globalData.openId,
          
          createAt:Date.now(),
          ...userInfo,
        }
      })
    }

    // 可执行其他自定义逻辑
    // console.log 的内容可以在云开发云函数调用日志查看
    ctx.body = {
      ...ctx.globalData
    };
  }
]