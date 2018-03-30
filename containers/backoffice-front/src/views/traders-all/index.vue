<template lang="pug">
  section.section
    .container(v-if="traders")
      .columns
        .column.is-4.is-offset-4
          div(v-if="isEmpty")
            button.button.is-large.is-outlined.is-primary
              | Create a trader

</template>

<script src="./main.js"></script>

<style scoped>
.button {
  width: 100%;
}
</style>


