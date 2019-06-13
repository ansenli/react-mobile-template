const Router = require('koa-router')();
let loginReponse = require('../module/login');

Router.get('/login',ctx=>{
  ctx.body = loginReponse
})

module.exports = Router;