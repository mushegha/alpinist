<template lang="pug">
  section.section
    .container(v-if="traders")
      .columns
        .column.is-4.is-offset-4
          div(v-if="isEmpty")
            config-form(
              @input="updateConfig"
            )

</template>

<script src="./main.js"></script>

<style scoped>
.button {
  width: 100%;
}
</style>


