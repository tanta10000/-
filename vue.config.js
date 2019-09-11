const path = require('path')
module.exports = {
  configureWebpack:{
    devServer:{
      proxy: {
        '/api': {
          target: 'https://m.toutiao.com',
          ws: true,
          pathRewrite: {
            '^/api':'/'
          },
          changeOrigin: true, // 允许跨域的 属性一定必须放在最后面
        },
        "/touApi":{
          target: "http://ic.snssdk.com/2/article/v25/stream/",
          ws: true,
          pathRewrite: {
            '^/touApi':'/'
          },
          changeOrigin: true
        },
        "/xiGuaApi":{
          target: "https://m.ixigua.com/",
          ws: true,
          pathRewrite: {
            '^/xiGuaApi':'/'
          },
          changeOrigin: true
        },
        "/videoApi":{
          target: "https://i.snssdk.com/",
          ws: true,
          pathRewrite: {
            '^/videoApi':'/'
          },
          changeOrigin: true
        },
        "/tuoTiao":{
          target: "https://www.toutiao.com/api/comment/",
          ws: true,
          pathRewrite: {
            '^/tuoTiao':'/'
          },
          changeOrigin: true
        },



      }
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/scss/*.scss'),
      ]
    }
  },
  lintOnSave: false
}
