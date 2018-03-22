const rt = require('rethinkdb')

const { curryN } = require('ramda')

/**
 * Table ref
 */

const Table = rt
  .db('alpinist')
  .table('ladder')

/**
 * Helpers
 */

const hasNotField = name =>
  rt.row
    .hasFields(name)
    .not()

/**
 * Actions
 */

async function getAllOpen (conn, target) {
  const cursor = await Table
    .filter(target)
    .filter(hasNotField('dateClose'))
    .orderBy('price')
    .run(conn)

  return cursor.toArray()
}

/**
 * Buy
 *
 * @param {Object} ticker
 * @param {string} ticker.origin
 * @param {string} ticker.symbol
 * @param {number} ticker.ask
 * @param {number} investment
 */

async function buy (conn, ticker, investment) {
  if (!investment) return Promise.resolve()

  const origin    = ticker.origin
  const symbol    = ticker.symbol
  const priceOpen = ticker.ask

  const amount    = investment / priceOpen

  const slot = {
    origin,
    symbol,
    //
    investment,
    amount,
    // meta
    priceOpen,
    dateOpen: new Date()
  }

  return Table
    .insert(slot)
    .run(conn)
}

/**
 * Sell
 *
 * @param {Object} ticker
 * @param {number} ticker.bid
 * @param {string} id
 */

async function sellSlot (conn, ticker, id) {
  const priceClose = ticker.bid

  const data = {
    priceClose,
    dateClose: new Date()
  }

  return Table
    .get(id)
    .update(data)
    .run(conn)
}

module.exports.getAllOpen = curryN(2, getAllOpen)

module.exports.buy = curryN(3, buy)
module.exports.sellSlot = curryN(3, sellSlot)
