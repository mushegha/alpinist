<template lang="pug">
  section.section
    .container(v-if="isLoaded")
      status-level(:symbol="body.symbol")

      .columns
        .column.is-4
          trader-panel(:id="id" :value="body")

        .column.is-8
          record-column(:trader="id")

</template>

<script src="./main.js"></script>
