<template lang="pug">
  el-form(
    v-if="model"
    label-position="top")

    settings-fieldset(v-model="settings")

    el-form-item

      el-button(@click="submit")
        | Update

      el-button(@click="redirectBack")
        | Cancel

</template>

<style scoped> </style>

<script src="./main.js"></script>
