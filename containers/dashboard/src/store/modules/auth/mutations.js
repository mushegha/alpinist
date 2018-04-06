import Vue from 'vue'

export function PUT (state, data) {
  Vue.set(state, 'token', data.token)
}
