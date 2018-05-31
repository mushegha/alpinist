<template lang="pug">
  el-form(
    :model="form"
    label-position="top")

    el-form-item(label="Target ticker")
      ticker-cascader(v-model="form.ticker")

    el-form-item(label="Settings")
      settings-fieldset(v-model="form.settings")

    el-form-item

      el-button(@click="submit")
        | Create

      el-button(@click="redirectBack")
        | Cancel

</template>

<style scoped> </style>

<script src="./main.js"></script>
