import db from './db'

const url = 'http://ec2-13-59-155-218.us-east-2.compute.amazonaws.com:5984/orders'

/**
 * Actions
 */

function sync ({ commit }, opts = {}) {
  const options = {
    since: 0,
    live: true,
    retry: true
  }

  const sync = _ => {
    db.sync(url, options)
  }

  const subscribe = _ => {
    db.source(options)
      .subscribe(x => commit('PUT', x))
  }

  return db
    .replicate.from(url)
    .then(sync)
    .then(subscribe)
}

function put ({ commit }, payload) {
  return db.putOrder(payload)
}

function sell (ctx, payload) {
  let price

  try {
    const { tickers } = ctx.rootState
    const { broker, symbol } = payload

    const tick = tickers[`${broker}-${symbol}`]

    price = tick.bid_price
  } catch (err) {
    price = payload.price
  }

  const params = {
    id: payload.id,
    price,
    side: 'sell',
    status: 'new',
    time: Date.now()
  }

  return db
    .putOrder(params)
}

/**
 * Expose
 */

export {
  sync,
  put,
  sell
}
