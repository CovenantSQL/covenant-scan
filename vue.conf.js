module.exports = {
  devServer: {
    host: 'localhost',
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
      .options({})
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#016DE6',
          'link-color': '#016DE6',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      },
    },
  },
}
