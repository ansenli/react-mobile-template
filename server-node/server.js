
const Router = require('koa-router')();
const Koa = require('koa');
const App = new Koa();
let user = require('./routes/user.js');
let login = require('./routes/login')

/* 装载所有子路由
let router = new Router();
*/

Router.use('/',login.routes())
Router.use('/user',user.routes())
// 加载路由中间件
App.use(Router.routes());
let server = App.listen(3080,()=>{
  let host = server.address().address;
  let port = server.address().port;
  console.log("[server]started http://%s:%s", host, port)
})