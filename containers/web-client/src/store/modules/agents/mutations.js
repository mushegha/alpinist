import Vue from 'vue'

function SET_AGENT (state, agent) {
  return Vue.set(state, agent.id, agent)
}

export {
  SET_AGENT
}
