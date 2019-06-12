const Router = require('koa-router');
let router = new Router();

const main = ctx =>{
  console.log("ctx.res",ctx.response)
  ctx.response.type = "html";
  ctx.response.body = '<a href="/">Index Page</a>'
}

router.get('/',main)

module.exports = router;