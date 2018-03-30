<template lang="pug">
  section.section
    .container(v-if="isLoaded")
      .level
        .level-rigth
          ticker-status(:symbol="body.symbol")

      .columns
        .column.is-4
          trader-panel(:value="body")

        .column.is-8
          record-column(:trader="id")

</template>

<script src="./main.js"></script>
