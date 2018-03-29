const {
  compose
} = require('ramda')


module.exports = () => {
  return async function queryparser (ctx, next) {

    return next()
  }
}
