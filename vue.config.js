// configuration scavenged from https://newbedev.com/how-to-break-the-js-files-into-chunks-in-vue-cli-3-with-webpack-performance-object
module.exports = {
    configureWebpack:{
      optimization: {
        splitChunks: {
          minSize: 10000,
          maxSize: 250000,
        }
      }
    }
  }