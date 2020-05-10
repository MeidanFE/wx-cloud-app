const cloud = require('wx-server-sdk')


exports.createTip = [
  async (ctx) => {
    const {db,event,global} = ctx;
    const {
      userInfo,
      address,
      content,
      lat,
      lng,
      images,
    } = event;

    ctx.body = await db.collection('tip').add({
      data:{
        content,
        images,
        location:db.Geo.Point(lng, lat),
        address,
        create_at:Date.now(),
        userInfo
      }
    })
    
  }
]