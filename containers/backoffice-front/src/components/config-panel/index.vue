<template lang="pug">
  .panel
    .panel-heading
      .level
        .level-left
          .level-item
            | Config
        .level-right
          .level-item
            .field
              b-switch(disabled) Running
    .panel-block
      b-field(label="Treshold")
        b-input(
          disabled
          type="number"
          v-model="config.treshold"
        )

    .panel-block
      b-field(label="Investment")
        b-input(
          disabled
          type="number"
          v-model="config.investment"
        )

    .panel-block

      b-field(label="Up x")
        b-input(
          disabled
          type="number"
          v-model="config.upK"
        )

      b-field(label="Up +")
        b-input(
          disabled
          type="number"
          v-model="config.upB"
        )

      b-field(label="Down x")
        b-input(
          disabled
          type="number"
          v-model="config.downK"
        )

      b-field(label="Down +")
        b-input(
          disabled
          type="number"
          v-model="config.downB"
        )

    .panel-block
      b-field(label="Sell limit")
        b-input(
          disabled
          type="number"
          v-model="config.limitSell"
        )

      b-field(label="Keep limit")
        b-input(
          disabled
          type="number"
          v-model="config.limitKeep"
        )

    .panel-block
      button.button.is-link.is-outlined.is-fullwidth(disabled)
        | Save config

</template>

<script src="./script.js"></script>
