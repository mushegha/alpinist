import Vue from 'vue'

import { mapActions } from 'vuex'

import {
  keys,
  pick
} from 'ramda'

const { destroyOne } = mapActions('trader', ['destroyOne'])

export {
  destroyOne
}

export function destroyTrader (input) {
  return this
    .destroyOne(this.id)
    .then(_ => {
      this.$router.push('/')
    })
}

export function resetValues () {
  this.setValues(this.value)
}

export function submitValues () {
  const values = pick(this.fields, this.input)
  this.$emit('input', values)
}
