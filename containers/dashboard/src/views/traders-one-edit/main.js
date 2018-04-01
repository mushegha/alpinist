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

const props = ['id']

function data () {
  return {
    config: null
  }
}

const methods = {
  updateTrader () {
    const { id, config } = this

    const formData = assoc('id', id, config)

    return this
      .updateOne(formData)
      .then(_ => {
        this.$router.push(`/${id}`)
      })
  },
  async init () {
    this.config = await this.fetchOne(this.id)
  },
  ...mapActions('trader', [
    'fetchOne',
    'updateOne'
  ])
}

async function beforeMount () {
  this.init()
}

export default {
  name: 'view-traders-all',
  props,
  components,
  data,
  methods,
  beforeMount
}
