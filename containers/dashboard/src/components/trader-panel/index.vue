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
  a.panel-block(:href="'/' + id + '/log'")
    | View transactions
  a.panel-block(@click.prevent="liquidateAll")
    | Liquidate assets
  a.panel-block(@click.prevent="destroyTrader")
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
