<template lang="pug">
  section.section
    .container(v-if="config")
      .columns
        .column.is-4.is-offset-4
          form(
            v-if="config"
            @submit.prevent="updateTrader"
          )
            trader-config-fieldset(v-model="config")
            hr
            .field.is-horizontal
              .field-label
              .field-body
                .field
                  .control
                    button.button.is-outlined.is-success
                      | Update
                .field
                  .control
                    router-link.button.is-outlined(:to="'/'+id")
                      | Cancel

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


