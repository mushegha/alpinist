import db from './db'

const remoteUrl = 'http://178.62.246.62:5984/orders'

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
    db.sync(remoteUrl, options)
  }

  const subscribe = _ => {
    db.source(options)
      .subscribe(x => commit('PUT', x))
  }

  return db
    .replicate.from(remoteUrl)
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
