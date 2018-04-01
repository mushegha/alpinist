<template lang="pug">
  section.section
    .container(v-if="traders")
      .columns
        .column.is-4.is-offset-4
          form(
            v-if="isEmpty"
            @submit.prevent="createTrader"
          )
            .field.is-horizontal
              .field-label.is-normal
                | Symbol
              .field-body
                .field
                  .control
                    select.input(v-model="symbol")
                      option ethusd
                      option btcusd
                      option neousd
                      option xrpusd
                      option bchusd
                      option etcusd
                      option ltcusd
                  .help Could not change in trader lifetime
            trader-config-fieldset(v-model="config")
            hr
            .field.is-horizontal
              .field-label
              .field-body
                .field
                  .control
                    button.button.is-outlined.is-success
                      | Create
</template>

<script src="./main.js"></script>

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


