<template lang="pug">
  section.section
    .container
      .columns
        .column.is-3
          ticker-status(:symbol="symbol")

        .column.is-9
          record-column(:trader="id")

</template>

<script src="./main.js"></script>
