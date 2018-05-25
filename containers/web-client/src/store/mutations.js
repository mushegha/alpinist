import Vue from 'vue'

function SET_AGENT_LIST (state, list) {
  Vue.set(state, 'agents', list)
}

export {
  SET_AGENT_LIST
}
