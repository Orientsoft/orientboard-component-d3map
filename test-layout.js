var fs = require('fs-extra')
  , path = require('path')

var pkg = fs.readJsonSync(path.join(__dirname, 'package.json'))

module.exports = [
  { type: pkg.orientboard.name
  , h: 400
  , w: 400
  , x: 0
  , y: 0
  , rotate: 0
  , data: {

    }
  }
]
