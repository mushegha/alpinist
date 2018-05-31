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

function sell ({ commit }, payload) {
  const params = {
    id: payload.id,
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
