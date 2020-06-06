exports.createTip = [
  async (ctx) => {
    const {
      db,
      event,
      globalData
    } = ctx;
    const {
      content,
      images,
      color,
      scoped,
      lat,
      lng,
      address,
      userInfo,
    } = event;

    userInfo.openId = globalData.openId;

    ctx.body = await db.collection('tip').add({
      data: {
        content,
        images,
        color,
        scoped,
        address,
        location: db.Geo.Point(lng, lat),
        createAt: Date.now(),
        userInfo
      }
    })

  }
]


exports.getTip = [
  async (ctx) => {
    
    const {
      db,
      event,
      globalData
    } = ctx;
    const _ = db.command;

    const {
      // userInfo,
      pageNo,
      pageSize = 10,
      scoped = 'private'
    } = event;

    console.log(globalData)
    const query = db.collection('tip').where({
      userInfo:{
        openId: globalData.openId,
      },
    })
    
    const {data} = await query.skip((pageNo - 1) * pageSize).limit(pageSize).get();
    const {total} = await query.count() ;

    ctx.body = {
      hasMore:total>pageNo*pageSize,
      list:data,
      pageNo,
      pageSize
    }
  }
]

exports.countTip = [
  async (ctx) => {
    
    const {
      db,
      globalData
    } = ctx;

    const $ = db.command.aggregate
    const {list} = await db.collection('tip').aggregate().match({
      userInfo:{
        openId: globalData.openId,
      },
    }).group({
      _id: '$scoped',
      num: $.sum(1)
    })
    .end()

    console.log(list)


    ctx.body = list.reduce((obj,item)=>{
      obj[item._id] = item.num;
      return obj;
    },{})
  }
]
