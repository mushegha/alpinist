<template lang="pug">
div
  .field.is-horizontal
    .field-label.is-normal
      | Threshold
    .field-body
      .field
        .control
          input.input(
            type="number"
            v-model.number="input.treshold"
          )
        .help Step size

  .field.is-horizontal
    .field-label.is-normal
      | Investment
    .field-body
      .field
        .control
          input.input.is-expanded(
            type="number"
            v-model.number="input.investment"
          )
        .help Initial buyin

  .field.is-horizontal

    .field-label.is-normal
      | Up factors

    .field-body
      .field
        .control
          input.input(
            type="number"
            v-model.number="input.buyUpK"
          )
        .help Multiply

      .field
        .control
          input.input(
            type="number"
            v-model.number="input.buyUpB"
          )
        .help Add

  .field.is-horizontal

    .field-label.is-normal
      | Down factors

    .field-body
      .field
        .control
          input.input(
            type="number"
            v-model.number="input.buyDownK"
          )
        .help Multiply

      .field
        .control
          input.input(
            type="number"
            v-model.number="input.buyDownB"
          )
        .help Add

  .field.is-horizontal

    .field-label.is-normal
      | Limits

    .field-body
      .field
        .control
          input.input(
            type="number"
            v-model.number="input.limitSell"
          )
        .help Sell

      .field
        .control
          input.input(
            type="number"
            v-model.number="input.limitKeep"
          )
        .help Keep

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
