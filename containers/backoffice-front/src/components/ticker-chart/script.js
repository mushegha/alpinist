import Taucharts from 'taucharts'

import { Observable } from 'rxjs/Observable'

import { mapActions, mapGetters } from 'vuex'

import { pick, range } from 'ramda'

const props = ['target']

function mounted () {
  const stream = Observable
    .interval(500)

  this.$subscribeTo(stream, _ => _)

  const chart = new Taucharts.Chart({
    type: 'line',
    x: ['x'],
    y: ['y'],
    color: 'type',
    guide: [
      {
        x: { autoScale: false },
        y: { autoScale: false, min: -1.5, max: 1.5 },
        interpolate: 'basis'
      }
    ],

    settings: {
      animationSpeed: 0
    },

    data: range(1, 100).reduce(function (memo, i) {
        var x = i * (Math.PI / 100);
        return memo.concat([
            {
                x: x,
                y: Math.sin(x),
                type: 'sin'
            },
            {
                x: x,
                y: Math.cos(x),
                type: 'cos'
            }
        ]);
    }, []),

      // plugins: [
      //     Taucharts.api.plugins.get('trendline')({showPanel:false})
      // ]
      });

    chart.renderTo(this.$el);
}

const methods = {}
const computed = mapGetters('ticker', ['scope'])

export default {
  props,
  computed,
  methods,
  mounted
}
