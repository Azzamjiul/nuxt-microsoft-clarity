const { resolve } = require('path')

module.exports = function module (moduleOptions) {
  const defaults = {
    id: null,
    debug: false
  }

  const options = Object.assign({}, defaults, this.options.microsoftClarity, moduleOptions)

  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    ssr: false,
    options
  })

}

module.exports.meta = require('./../package.json')
