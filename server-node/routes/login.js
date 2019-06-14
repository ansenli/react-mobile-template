const Router = require('koa-router')();
let loginReponse = require('../module/login');

Router.post('/',ctx=>{
  ctx.body = loginReponse
})

module.exports = Router;