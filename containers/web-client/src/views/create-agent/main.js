import {
  mapState,
  mapActions
} from 'vuex'

import TargetCascader from '@/components/agent-target-cascader'

const state = mapState('env', [ 'targets' ])

const computed = {
  ...state
}

const data = () => {
  const form = {
    target: null
  }

  return {
    form
  }
}

const actions = mapActions([
  'createAgent'
])

const methods = {
  onSubmit (x) {
    const { form } = this

    const redirect = _ =>
      this.$router
        .push('/')

    return this
      .createAgent(form)
      .then(redirect)
  },
  ...actions
}

export default {
  name: 'view-create-form',
  components: {
    TargetCascader
  },
  computed,
  data,
  methods
}
