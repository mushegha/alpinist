import Vue from 'vue'

import { equals } from 'ramda'

/**
 * Mutations
 */

export function PUT (state, data) {
  if (!equals(state, data))
    state.splice(0, state.length, ...data)
}
