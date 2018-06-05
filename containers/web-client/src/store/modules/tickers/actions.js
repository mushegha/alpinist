import * as MQTT from './mqtt'

/**
 * Actions
 */

function sync ({ commit }, opts = {}) {
  const update = x =>
    commit('PUT', x)

  return MQTT
    .source()
    .subscribe(update)
}

/**
 * Expose
 */

export {
  sync
}
