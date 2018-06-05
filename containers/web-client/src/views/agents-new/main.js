import { mapActions } from 'vuex'

import TickerCascader from '@/components/ticker-cascader'
import SettingsFieldset from '@/components/agent-settings-fieldset'

const data = () => {
  const form = {
    ticker: null,
    settings: {
      priceThreshold: 1,
      buyIn: 100,
      buyInNextUp: { k: 1, b: 0 },
      buyInNextDown: { k: 1, b: 0 },
      sellLimit: 1,
      sellOffset: 1
    },
    isActive: false
  }

  return {
    form
  }
}

const actions = mapActions({
  create: 'agents/create'
})

const methods = {
  redirectBack () {
    const name = 'agents-all'
    this.$router.push({ name })
  },
  submit () {
    return this
      .create(this.form)
      .then(_ => this.redirectBack())
  },
  ...actions
}

export default {
  name: 'agents-new',
  components: {
    TickerCascader,
    SettingsFieldset
  },
  data,
  methods
}
