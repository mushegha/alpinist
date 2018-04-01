import { Chart } from 'taucharts'

import Tooltip from 'taucharts/dist/plugins/tooltip'

export function beforeMount () {
  this.chart = new Chart({
    type: 'stacked-bar',
    dimensions: {
      t     : { type : 'order' },
      worth : { type: 'measure' }
    },
    x     : 't',
    y     : 'worth',
    color : 'type',
    data  : this.data,
    plugins: [
      Tooltip()
    ]
  })
}

export function mounted () {
  this.chart.renderTo(this.$el)
}

