const mongo = require('../clients/mongo')

async function getOpenSlots () {
  const query = {
    dateClose: { $exists: false }
  }

  const options = {
    sort: { priceOpen: 1 }
  }

  return mongo
    .get('ladder')
    .find(query, options)
}

module.exports = {
  getOpenSlots
}
