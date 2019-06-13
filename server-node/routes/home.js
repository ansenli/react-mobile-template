const Router = require('koa-router')();
let homeReponse = require('../module/home');

Router.get('/',ctx=>{
  ctx.body = homeReponse
})

module.exports = Router;