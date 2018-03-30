import Vue from 'vue'

import {
  keys,
  pick
} from 'ramda'

export function setValues (input) {
  const values = pick(this.fields, input)

  Vue.set(this, 'input', values)
}

export function resetValues () {
  this.setValues(this.value)
}

export function submitValues () {
  const values = pick(this.fields, this.input)
  this.$emit('input', values)
}
