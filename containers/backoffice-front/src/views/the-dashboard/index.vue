<template lang="pug">
  section.section
    .container
      .columns
        .column.is-3
          ladder-status
        .column.is-9
          ticker-status(
            :provider="provider"
            :pair="pair"
          )

</template>

<script src="./main.js"></script>
