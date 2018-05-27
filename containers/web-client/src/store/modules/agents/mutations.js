import Vue from 'vue'

function PUT (state, agent) {
  const { id } = agent

  return agent._deleted
    ? Vue.delete(state, id)
    : Vue.set(state, id, agent)
}

export {
  PUT
}
