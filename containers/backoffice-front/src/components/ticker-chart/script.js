import { Observable } from 'rxjs/Observable'

import { mapActions, mapGetters } from 'vuex'

import { pick, map } from 'ramda'

const props = ['target']

function mounted () {
  this.chart = ''
}

const methods = {}

const watch = {
  source (data) {

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
