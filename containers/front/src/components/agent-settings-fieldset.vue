<template lang="pug">
  el-form(
    :model="form"
    :rules="rules")

    el-form-item(
      prop="level_threshold"
      label="Level threshold")

      el-input-number(
        :min="1"
        controls-position="right"
        v-model="form.level_threshold")

</template>

<style scoped>
fieldset {
  border: none;
  padding: 0;
}
</style>

<script>

function data () {
  const rules = {
    level_threshold: [
      {
        type: 'number',
        required: true,
        message: 'Please input level threshold',
        trigger: 'blur'
      }
    ]
  }

  const form = {
    level_threshold: null
  }

  return {
    rules,
    form
  }
}

const methods = {
  handleChange () {
    this.$emit('input', this.form)
  }
}

export default {
  name: 'agent-form-create',
  data,
  methods
}
</script>
