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

  const url = 'http://ec2-13-59-155-218.us-east-2.compute.amazonaws.com:5984/agents'

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

function create ({ commit }, payload) {
  return db
    .putAgent(payload)
}

function put ({ commit }, payload) {
  return db.putAgent(payload)
}

/**
 * Expose
 */

export {
  sync,
  create,
  put
}
