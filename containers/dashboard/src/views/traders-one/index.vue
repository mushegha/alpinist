<template lang="pug">
  section.section
    .container(v-if="isLoaded")
      status-level(:symbol="body.symbol")

      hr

      .columns
        .column.is-3
          trader-panel(:id="id" :value="body")

        .column.is-9
          record-column(:trader="id")

</template>

<script src="./main.js"></script>
