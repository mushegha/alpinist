<template lang="pug">
div
  b-collapse.card(:open="false")
    .card-header(
      slot="trigger"
      slot-scope="props"
    )
      .card-header-title
        | Settings
    .card-content
      config-form(
        :value="value"
      )
</template>

<script src="./script.js"></script>

<style scoped>
.field-label {
  flex-grow: 1;
}
.field-body {
  flex-grow: 2;
}
.button {
  width: 100%;
}
</style>
