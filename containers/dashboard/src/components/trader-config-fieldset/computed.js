import Vue from 'vue'

import {
  equals,
  isEmpty,
  keys,
  pick
} from 'ramda'

const DEFAULTS = {
  investment : 100,
  treshold   : 5,
  buyDownB   : 0,
  buyDownK   : 1,
  buyUpB     : 0,
  buyUpK     : 1,
  limitKeep  : 1,
  limitSell  : 4
}

export function defaults () {
  return DEFAULTS
}

export function fields () {
  return keys(this.defaults)
}

export function isClean () {
  const { input, value, fields } = this

  return equals(input, pick(fields, value))
}
