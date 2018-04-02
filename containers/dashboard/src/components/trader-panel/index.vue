<template lang="pug">
.panel
  div.panel-block
    .field.is-horizontal
      .field-label
        | {{ value.isRunning ? 'Pause' : 'Start' }}
      .field-body
        .control
          b-switch(
            v-model="value.isRunning"
            @input="toggleStatus"
          )
  a.panel-block(:href="'/' + id + '/edit'")
    | Edit configuration
  a.panel-block(@click.prevent="downloadCSV")
    | Download spreadsheet

  .panel-block.has-text-danger
    h4 Danger Zone

  .panel-block
    .control
      a.button.is-warning(@click.prevent="liquidateAll")
        | Liquidate

  .panel-block
    .control
      a.button.is-danger.is-outlined(@click.prevent="destroyTrader")
        | Destroy instance
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
