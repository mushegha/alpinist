import { Chart } from 'taucharts'

export default function mounted () {
  const chart = new Chart({
    type: 'stacked-bar',
    dimensions: {
      t: {
        type : 'order'
      },
      worth: {
        type: 'measure'
      }
    },
    x   : 't',
    y   : 'worth',
    color: 'type',
    data: this.data
  })

  chart.renderTo(this.$el)

  this.chart = chart
}
