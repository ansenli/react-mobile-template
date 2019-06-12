const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:3080/',
      //target:'https://www.baidu.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}