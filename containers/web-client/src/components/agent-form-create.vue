<template lang="pug">
  el-form(ref="form" v-model="form")
    target-cascader(v-model="form.target")
    settings-fieldset(v-model="form.settings")

</template>

<script>

import TargetCascader from '@/components/agent-target-cascader'
import SettingsFieldset from '@/components/agent-settings-fieldset'

function data () {
  const form = {
    target: null,
    settings: null
  }

  return { form }
}

export default {
  name: 'agent-form-create',
  data,
  components: {
    TargetCascader,
    SettingsFieldset
  }
}
</script>
