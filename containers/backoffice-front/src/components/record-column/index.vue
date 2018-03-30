<template lang="pug">
.box
  .level
    .level-right
      .level-item
        h3 Open Records
    .level-left
      record-stats.level-item(:rows="rows")
  record-table(:rows="rows")

</template>

<script src="./script.js"></script>
