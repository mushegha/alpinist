import { mapActions } from 'vuex'

import TickerCascader from '@/components/ticker-cascader'

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
    TickerCascader
  },
  data,
  methods
}
