const Router = require('koa-router')();
let homeReponse = require('../module/home');

Router.get('/home',ctx=>{
  ctx.body = homeReponse
})

module.exports = Router;