const Router = require('koa-router')();
let registerReponse = require('../module/register');

Router.get('/',ctx=>{
  ctx.body = registerReponse
})

module.exports = Router;