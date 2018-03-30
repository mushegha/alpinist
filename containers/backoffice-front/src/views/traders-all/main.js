import { mapActions } from 'vuex'

import {
  always,
  isEmpty,
  head
} from 'ramda'

const components = {}

const data = always({ traders: void 0 })

const computed = {
  isEmpty () {
    const { traders } = this
    return traders && isEmpty(traders)
  }
}

const methods = mapActions('trader', ['fetchAll'])

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
  beforeMount,
}
