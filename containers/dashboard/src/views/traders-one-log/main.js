import { mapActions } from 'vuex'

import {
  compose,
  is,
  always,
  isEmpty,
  head,
  assoc,
  map,
  reduce
} from 'ramda'

import { format } from 'date-fns'

import TheChart from '@/the-chart'

import data from './data'

const props = ['id']

export default {
  name: 'view-traders-one-log',
  props,
  components: {
    TheChart
  },
  data
}
