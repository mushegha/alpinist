import { mapActions } from 'vuex'

import {
  always,
  isEmpty,
  head
} from 'ramda'

import ConfigForm from '@/config-form'

const components = {
  ConfigForm
}

function data () {
  return {
    traders: void 0,
    config: void 0
  }
}

const computed = {
  isEmpty () {
    const { traders } = this
    return traders && isEmpty(traders)
  }
}

const methods = {
  updateConfig (config) {
    console.log(config.investment)
  },
  ...mapActions('trader', [
    'fetchAll',
    'createOne'
  ])
}

const watch = {
  traders (arr) {
    if (isEmpty(arr)) return void 0

    const { _id } = head(arr)

    this.$router.push(`/${_id}`)
  }
}

async function beforeMount () {
  this.traders = await this.fetchAll()
}

export default {
  name: 'view-traders-all',
  components,
  data,
  computed,
  watch,
  methods,
  beforeMount
}
