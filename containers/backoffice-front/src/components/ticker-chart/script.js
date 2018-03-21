import Taucharts from 'taucharts'
import Trendline from 'taucharts/dist/plugins/trendline'

import { Observable } from 'rxjs/Observable'

import { mapActions, mapGetters } from 'vuex'

import { pick, map } from 'ramda'

const props = ['target']

function mounted () {
  const chart = new Taucharts.Chart({
    type: 'line',
    y: 'price',
    x: 'time',
    color: 'type',
    guide: {
      y: { nice: false, min: 9080, max: 9120 }
    },
    data: [
      { time: new Date(), price: 9000, type: 'bid' },
    ],
    settings: {
      animationSpeed: 0
    },
    dimensions: {
      price: {
        type: 'measure',
      },
      time: {
        type: 'measure',
        scale: 'time'
      }
    },
    plugins: []
  })

  chart.renderTo(this.$el);

  this.chart = chart
}

const methods = {}

const watch = {
  source (data) {
    this.chart.setData(data)
  }
}

const computed = {
  source () {
    const toPair = ({ bid, ask, time }) => {
      time = new Date(time).getTime()

      return {
        time,
        price: bid,
        type: 'bid'
      }
    }

    return map(toPair, this.scope)
  },
  ...mapGetters('ticker', ['scope'])
}

export default {
  props,
  computed,
  watch,
  methods,
  mounted
}
