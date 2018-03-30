<template lang="pug">
  section.section
    .container
      .columns
        .column.is-3(v-if="isLoaded")
          ticker-status(:symbol="body.symbol")

        .column.is-9
          record-column(:trader="id")

</template>

<script src="./main.js"></script>
