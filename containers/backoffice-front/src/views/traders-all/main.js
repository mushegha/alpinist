import { mapActions } from 'vuex'

import {
  always,
  isEmpty,
  head,
  assoc
} from 'ramda'

import TraderConfigFieldset from '@/trader-config-fieldset'

const components = {
  TraderConfigFieldset
}

function data () {
  return {
    traders: void 0,
    config: void 0,
    symbol: 'btcusd'
  }
}

const computed = {
  isEmpty () {
    const { traders } = this
    return traders && isEmpty(traders)
  }
}

const methods = {
  createTrader (e) {
    const { config, symbol } = this
    const formData = assoc('symbol', symbol, config)

    return this
      .createOne(formData)
      .then(_ => {
        this.init()
      })
  },
  async init () {
    const traders = await this.fetchAll()

    if (isEmpty(traders)) {
      this.traders = traders
    } else {
      const { _id } = head(traders)
      this.$router.push(`/${_id}`)
    }
  },
  ...mapActions('trader', [
    'fetchAll',
    'createOne'
  ])
}

async function beforeMount () {
  this.init()
}

export default {
  name: 'view-traders-all',
  components,
  data,
  computed,
  methods,
  beforeMount
}
