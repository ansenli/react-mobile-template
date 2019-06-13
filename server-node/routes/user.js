const Router = require('koa-router')();
let userReponse = require('../module/user');

Router.get('/',ctx=>{
  ctx.body = userReponse
})

module.exports = Router;