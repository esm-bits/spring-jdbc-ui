const path = require('path')

module.exports = {
  publicPath: '',
  outputDir: path.resolve(__dirname, '../main/resources/META-INF/ui'),
  devServer: {
    proxy: {
      '/api/query': {
        target: 'http://localhost:8080'
      }
    }
  }
}
