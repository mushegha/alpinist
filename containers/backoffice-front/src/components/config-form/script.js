import Vue from 'vue'

import { Observable } from 'rxjs/Observable'

import {
  mapActions,
  mapState
} from 'vuex'

import {
  pick,
  reverse
} from 'ramda'

import * as computed from './computed'

import * as methods from './methods'

const props = ['value']

function data () {
  return {
    input: {}
  }
}

const watch = {
  value (value) {
    this.setValues(this.value)
    console.log(value)
  }
}

function beforeMount () {
  this.setValues(this.value)
}

export default {
  props,
  data,
  computed,
  watch,
  beforeMount,
  methods
}
