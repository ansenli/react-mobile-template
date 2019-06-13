const Router = require('koa-router')();
let userReponse = require('../module/user');

Router.get('/user',ctx=>{
  ctx.body = userReponse
})

module.exports = Router;