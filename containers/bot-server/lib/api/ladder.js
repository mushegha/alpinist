const rt = require('rethinkdb')

const { connect } = require('../clients/rethinkdb')

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

async function getAllOpen (target) {
  const conn = await connect()

  const cursor = await Table
    .filter(target)
    .filter(hasNotField('dateClose'))
    .orderBy('position')
    .run(conn)

  return cursor.toArray()
}

/**
 * Buy
 *
 * @param {Object} target
 * @param {string} target.origin
 * @param {string} target.symbol
 * @param {Object} params
 * @param {number} params.amount
 * @param {number} params.price
 */

async function buy (target, params) {
  const { origin, symbol } = target
  const { amount, price } = params

  const investment = price * amount

  const slot = {
    origin,
    symbol,
    amount,
    investment,
    // meta
    position: price,
    dateOpen: new Date()
  }

  const conn = await connect()

  return Table
    .insert(slot)
    .run(conn)
}

/**
 * Sell
 *
 * @param {Object} target
 * @param {string} target.origin
 * @param {string} target.symbol
 * @param {Object} params
 * @param {number} params.amount
 * @param {number} params.price
 */

async function sell (target, params) {
  const { origin, symbol } = target
  const { amount, price } = params

  const investment = price * amount

  const slot = {
    origin,
    symbol,
    amount,
    investment,
    // meta
    position: price,
    dateOpen: new Date()
  }

  const conn = await connect()

  return Table
    .get(slot)
    .run(conn)
}

module.exports = {
  getAllOpen
}

module.exports.buy = curryN(2, buy)
