import c3 from 'c3'

import { Observable } from 'rxjs/Observable'

import { mapActions, mapGetters } from 'vuex'

import { pick, map } from 'ramda'

const props = ['target']

function mounted () {
  const chart = c3.generate({
    bindto: this.$el,
    transition: {
      duration: 200
    },
    data: {
      x: 'time',
      rows: [
        ['time', 'bid', 'ask']
      ],
    },
    point: { show: false },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%H:%M:%S',
        }
      }
    }
  })

  this.chart = chart
}

const methods = {}

const watch = {
  rows (data) {
    this.chart.load({
      rows: [
        ['time', 'bid', 'ask'],
        ...data
      ]
    })
  }
}

const computed = {
  rows () {
    const header = ['time', 'bid', 'ask']
    const data = map(({time, bid, ask}) => {
      return [ new Date(time), bid, ask ]
    }, this.scope)
    return data
  },
  ...mapGetters('ticker', ['scope', 'last'])
}

export default {
  props,
  computed,
  watch,
  methods,
  mounted
}
