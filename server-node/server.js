
const Router = require('koa-router')();
const Koa = require('koa');
const App = new Koa();

/* 引入各个模块路由 */

let home = require('./routes/home');
let login = require('./routes/login');
let register = require('./routes/register');
let user = require('./routes/user');


/*装载所有子路由*/
Router.use('/home',home.routes());
Router.use('/login',login.routes());
Router.use('/register',register.routes());
Router.use('/user',user.routes());
/* 加载路由中间件 */
App.use(Router.routes());

/* 启动服务绑定端口 */
let server = App.listen(3080,()=>{
  let host = server.address().address;
  let port = server.address().port;
  console.log("[server]started http://%s:%s", host, port)
})