// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

// 中间件
const globalContext = require('./middleware/global-context');

// 路由
const {login} = require('./controller/user');
const {createTip,getTip,countTip} = require('./controller/tip');

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database({
  // env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = (event, context) => {
  console.log(event)
  console.log(context)

    const app = new TcbRouter({ event });
  
    // app.use 表示该中间件会适用于所有的路由
    app.use(globalContext({event,context,cloud,db}));

    // 路由为数组表示，该中间件适用于 user 和 timer 两个路由
    // app.router(['user', 'timer'], async (ctx, next) => {
    //     ctx.data.company = 'Tencent';
    //     await next(); // 执行下一中间件
    // });
    // 路由为字符串，该中间件只适用于 user 路由
    app.router('/login', ...login);
    app.router('/tip/create', ...createTip);
    app.router('/tip/get', ...getTip);
    app.router('/tip/count', ...countTip);

    return app.serve();
}





