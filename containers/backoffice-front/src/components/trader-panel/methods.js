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

const {
  liquidate
} = mapActions('record', { liquidate: 'destroyAllOf' })

export {
  destroyOne,
  updateOne,
  liquidate
}

export function destroyTrader (input) {
  return this
    .destroyOne(this.id)
    .then(_ => {
      this.$router.push('/')
    })
}

export function liquidateAll () {
  return this
    .liquidate(this.id)
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
