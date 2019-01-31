module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: '',
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
