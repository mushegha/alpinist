import { Chart } from 'taucharts'

import tooltip from './tooltip'

export default function chart () {
  return new Chart({
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
