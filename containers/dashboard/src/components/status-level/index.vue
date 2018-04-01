<template lang="pug">
.level
  .level-right
    .level-item
      .tags.has-addons
        .tag.is-dark {{ symbol | toUpper }}
        .tag.is-success Bid /{{ bid }}
        .tag.is-danger Ask / {{ ask }}
  .level-left
    .level-item
      .tags.has-addons(v-if="worth")
        .tag.is-light Assets worth
        .tag.is-dark {{ worth }}

</template>

<script src="./script.js"></script>

<style scoped></style>
