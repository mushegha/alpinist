<template lang="pug">
  section.section
    .container(v-if="isLoaded")
      .columns
        .column.is-10.is-offset-1
          status-level(:symbol="body.symbol")

          hr

          .columns
            .column.is-4
              trader-panel(:id="id" :value="body")

            .column.is-8
              record-column(:trader="id")

</template>

<script src="./main.js"></script>
