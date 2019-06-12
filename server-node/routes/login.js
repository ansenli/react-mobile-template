const Router = require('koa-router');
let router = new Router();
// 导入数据
let loginData = require('../module/login');

// const login = ctx =>{
//   console.log("ctx.res",ctx.response)
//   ctx.response.type = "html";
//   ctx.response.body = loginData
// }

// router.get('/',main)

// router.get('/login',login)
router.get('/login',ctx=>{
  ctx.body = loginData
})

module.exports = router;