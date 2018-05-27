import {
  mapState,
  mapActions
} from 'vuex'

import TickerCascader from '@/components/ticker-cascader'

const state = mapState('env', [ 'tickers' ])

const computed = {
  ...state
}

const data = () => {
  const form = {
    ticker: null
  }

  return {
    form
  }
}

const actions = mapActions({
  create: 'agents/create'
})

const methods = {
  onSubmit (x) {
    const redirect = _ =>
      this.$router
        .push('/')

    return this
      .create(this.form)
      .then(redirect)
  },
  ...actions
}

export default {
  name: 'view-create-form',
  components: {
    TickerCascader
  },
  computed,
  data,
  methods
}
