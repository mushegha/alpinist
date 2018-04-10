import Chart from './chart'

export function beforeMount () {
  this.chart = Chart()
}

export function mounted () {
  this.chart.renderTo(this.$el)
  this.render()
}

