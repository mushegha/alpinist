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

import ConfigForm from '@/config-form'

import * as computed from './computed'

import * as methods from './methods'

const props = ['value']

const components = {
  ConfigForm
}

function data () {
  return {
    input: {}
  }
}

export default {
  components,
  props,
  data,
  computed,
  methods
}
