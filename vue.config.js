// configuration scavenged from https://newbedev.com/how-to-break-the-js-files-into-chunks-in-vue-cli-3-with-webpack-performance-object
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
  },
    configureWebpack:{
      optimization: {
        splitChunks: {
          minSize: 10000,
          maxSize: 250000,
        }
      }
    }
  }


