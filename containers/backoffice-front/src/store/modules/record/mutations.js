import Vue from 'vue'

/**
 * Mutations
 */

export function PUT (state, data) {
  state.splice(0, state.length, ...data)
}
