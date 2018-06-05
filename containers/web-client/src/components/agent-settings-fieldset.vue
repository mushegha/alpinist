<template lang="pug">
  el-form-item(v-if="form")
    el-form-item(
      prop="priceThreshold"
      label="Price threshold")

      el-input-number(
        :min="1"
        controls-position="right"
        v-model="form.priceThreshold")

    el-form-item(
      prop="buyIn"
      label="Initial buy-in size")

      el-input-number(
        :min="1"
        controls-position="right"
        v-model="form.buyIn")

    el-form-item(
      prop="buyInNextUp"
      label="Strategy for price up")

      el-input-number(
        controls-position="right"
        v-model="form.buyInNextUp.k")

      el-input-number(
        controls-position="right"
        v-model="form.buyInNextUp.b")

    el-form-item(
      prop="buyInNextDown"
      label="Strategy for price down")

      el-input-number(
        controls-position="right"
        v-model="form.buyInNextDown.k")

      el-input-number(
        controls-position="right"
        v-model="form.buyInNextDown.b")

    el-form-item(
      prop="sellLimit"
      label="Sell limit")

      el-input-number(
        controls-position="right"
        v-model="form.sellLimit")

    el-form-item(
      prop="sellOffset"
      label="Sell offset")

      el-input-number(
        controls-position="right"
        v-model="form.sellOffset")
</template>

<style scoped>
fieldset {
  border: none;
  padding: 0;
}
</style>

<script>

const props = {
  value: Object
}

const methods = {
  handleChange () {
    this.$emit('input', this.form)
  }
}

function data () {
  return { form: null }
}

function mounted () {
  this.form = this.value
}

export default {
  name: 'agent-settings-fieldset',
  data,
  props,
  mounted,
  methods
}
</script>
