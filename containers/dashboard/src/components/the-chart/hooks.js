import { Chart } from 'taucharts'

import Tooltip from 'taucharts/dist/plugins/tooltip'

import { format } from 'date-fns'

function tooltip () {
  const time = {
    label: 'Time',
    format (epoch) {
      return format(epoch, 'DD/MM/YYYY HH:mm')
    }
  }

  const formatters = {
    time
  }

  return Tooltip({ formatters })
}

export function beforeMount () {
  this.chart = new Chart({
    type: 'stacked-bar',
    dimensions: {
      time  : { type : 'order' },
      worth : { type: 'measure' }
    },
    x     : 'time',
    y     : 'worth',
    color : 'type',
    data  : [],
    plugins: [
      tooltip()
    ]
  })
}

export function mounted () {
  this.chart.renderTo(this.$el)
  this.render()
}

