const isNode = require('detect-node')

function getBaseURL () {
  const fromNode = _ => {
    return process.env.COUCHDB_URL
      || 'http://localhost:5984'
  }

  const fromBrowser = _ => {
    const {
      protocol,
      hostname
    } = window.location

    return `${protocol}//${hostname}`
  }


  return isNode
    ? fromNode()
    : fromBrowser()
}

module.exports = {
  getBaseURL
}
