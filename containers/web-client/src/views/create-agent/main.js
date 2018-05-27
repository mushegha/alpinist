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
    TargetCascader
  },
  computed,
  data,
  methods
}
