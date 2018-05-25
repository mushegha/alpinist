<template lang="pug">
  el-form(
    :model="form"
    label-position="top")

    el-form-item(label="Target")
      target-cascader(
        :targets="targets"
        v-model="form.target")

    el-form-item

      el-button(@click="onSubmit")
        | Create

      el-button
        | Cancel

</template>

<style scoped> </style>

<script src="./main.js"></script>
