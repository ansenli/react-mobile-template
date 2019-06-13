const Router = require('koa-router')();
let loginReponse = require('../module/login');

Router.get('/',ctx=>{
  ctx.body = loginReponse
})

module.exports = Router;