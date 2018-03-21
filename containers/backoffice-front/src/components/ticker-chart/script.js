import { render } from './chart'

import * as computed from './computed'

const props = ['target']

function mounted () {
  this.chart = render(this.$el)
}

const watch = {
  rows (rows) {
    this.chart.load({ rows })
  }
}

export default {
  props,
  computed,
  watch,
  mounted
}
