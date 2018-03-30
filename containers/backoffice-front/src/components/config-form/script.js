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

const props = {
  value: {
    type: Object,
    default () {
      return {}
    }
  }
}

function data () {
  return {
    input: {}
  }
}

function beforeMount () {
  this.setValues(this.value)
}

export default {
  props,
  data,
  computed,
  beforeMount,
  methods
}
