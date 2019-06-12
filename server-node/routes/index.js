const router = require('koa-route');
const about = ctx =>{
  ctx.response.body = 'Hello World';
}

const main = ctx =>{
  console.log("ctx.res",ctx.response)
  ctx.response.type = "html";
  ctx.response.body = '<a href="/">Index Page</a>'
}
router.get('/',main);
router.get('/about',about);
module.exports = router;