import Vue from 'vue'

import { mapActions } from 'vuex'

import {
  keys,
  pick
} from 'ramda'

const {
  destroyOne,
  updateOne
} = mapActions('trader', ['destroyOne', 'updateOne'])

export {
  destroyOne,
  updateOne
}

export function destroyTrader (input) {
  return this
    .destroyOne(this.id)
    .then(_ => {
      this.$router.push('/')
    })
}

export function toggleStatus () {
  const { id } = this
  const { isRunning } = this.value

  return this
    .updateOne({ id, isRunning })
}

export function submitValues () {
  const values = pick(this.fields, this.input)
  this.$emit('input', values)
}
