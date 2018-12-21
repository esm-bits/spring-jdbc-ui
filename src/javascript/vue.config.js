const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../main/resources/static'),
  devServer: {
    proxy: {
      '/api/query': {
        target: 'http://localhost:8080'
      }
    }
  }
}