import {
  mapGetters,
  mapActions
} from 'vuex'

import SettingsFieldset from '@/components/agent-settings-fieldset'

const props = {
  id: String
}

const getters = mapGetters({
  'byId': 'agents/byId'
})

const computed = {
  model () {
    return this.byId(this.id)
  },
  settings () {
    const { model = {} } = this
    return model.settings
  },
  ...getters
}

const actions = mapActions({
  update: 'agents/put'
})

const methods = {
  redirectBack () {
    const name = 'agents-one'
    const { id } = this
    this.$router.push({ name, params: { id } })
  },
  submit () {
    const { id, settings } = this

    return this
      .update({ id, settings })
      .then(_ => this.redirectBack())
  },
  ...actions
}

export default {
  name: 'agents-one-edit',
  components: {
    SettingsFieldset
  },
  props,
  computed,
  methods
}
