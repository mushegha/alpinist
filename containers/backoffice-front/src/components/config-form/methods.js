import Vue from 'vue'

import {
  keys,
  pick,
  merge,
  compose
} from 'ramda'

export function setValues (input) {
  const prepare = compose(
    pick(this.fields),
    merge(this.defaults)
  )

  const formData = prepare(input)

  Vue.set(this, 'input', formData)

  this.$emit('input', formData)
}

export function resetValues () {
  this.setValues(this.value)
}

export function submitValues () {
  const formData = pick(this.fields, this.input)
  this.$emit('input', formData)
}
