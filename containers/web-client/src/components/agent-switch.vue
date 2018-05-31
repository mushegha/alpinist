<template lang="pug">
  div
    el-switch(v-model="value")
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

const props = {
  id: String
}

const computed = {
  model () {
    return this.byId(this.id)
  },
  value: {
    get () {
      return this.model.isActive
    },
    set (isActive) {
      const id = this.id
      this.update({ id, isActive })
    }
  },
  ...mapGetters({
    byId: 'agents/byId'
  })
}

const methods = mapActions({
  update: 'agents/put'
})

export default {
  name: 'agent-switch',
  props,
  computed,
  methods
}
</script>
