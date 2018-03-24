const debug = require('debug')('alpinist:ladder')

const {
  map,
  prop
} = require('ramda')

const mongo = require('../clients/mongo')

async function openPosition (data) {
  const { amount, price } = data

  debug('Open position for %d at %d', amount, price)

  const doc = {
    amount    : amount,
    priceOpen : price,
    dateOpen  : new Date()
  }

  return mongo
    .get('ladder')
    .insert(doc)
}

async function markClose (priceClose, slots) {
  debug('Mark close %d lots at %d', slots.length, priceClose)

  const query = {
    _id: { $in: map(prop('_id'), slots) }
  }

  const update = {
    $set: {
      priceClose,
      dateClose: new Date()
    }
  }

  const options = {
    multi: true
  }

  return mongo
    .get('ladder')
    .update(query, update, options)
}

module.exports = {
  openPosition,
  markClose
}
