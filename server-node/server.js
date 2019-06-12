const route = require('koa-route');
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const App = new Koa();

const main = ctx =>{
  console.log("ctx.res",ctx.response)
  ctx.response.type = "html";
  ctx.response.body = '<a href="/">Index Page</a>'
}

const about = ctx =>{
  ctx.response.body = 'Hello World';
}

const mainStatic = serve(path.join(__dirname));

const redirect = ctx =>{
  ctx.response.redirect('/about');
  ctx.response.body = `<a href="/">Index Page</a>`;
}

App.use(mainStatic);
App.use(route.get('/',main));
App.use(route.get('/about',about));
App.use(route.get('/redirect',redirect));

App.listen(3080)