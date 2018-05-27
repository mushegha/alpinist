<template lang="pug">
  el-form(
    :model="form"
    label-position="top")

    el-form-item(label="Target ticker")
      ticker-cascader(v-model="form.ticker")

    el-form-item

      el-button(@click="onSubmit")
        | Create

      el-button
        | Cancel

</template>

<style scoped> </style>

<script src="./main.js"></script>
