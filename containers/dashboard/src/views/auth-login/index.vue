<template lang="pug">
  section.section
    .container
      .columns
        .column.is-4.is-offset-4
          form(@submit.prevent="login")
            .field.is-horizontal
              .field-label.is-normal
                | Username
              .field-body
                .field
                  .control
                    input.input(
                      disabled
                      value="admin"
                    )
            .field.is-horizontal
              .field-label.is-normal
                | Password
              .field-body
                .field
                  .control
                    input.input(
                      v-model="passphrase"
                      type="password"
                    )
            .field.is-horizontal
              .field-label.is-normal
              .field-body
                .field
                  .control
                    button.button(type="submit")
                      | Login



</template>

<script src="./main.js"></script>
