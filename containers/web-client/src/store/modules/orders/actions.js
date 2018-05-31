import db from './db'

/**
 * Actions
 */

function sync ({ commit }, opts = {}) {
  const options = {
    since: 0,
    live: true,
    retry: true
  }

  const url = 'http://178.62.246.62:5984/orders'

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

/**
 * Expose
 */

export {
  sync,
  put
}
