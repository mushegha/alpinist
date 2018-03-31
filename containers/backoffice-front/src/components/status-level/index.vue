<template lang="pug">
.level
  .level-right
    .level-item
      .tags.has-addons
        .tag.is-dark {{ symbol }}
        .tag.is-light {{ bid }}  /  {{ ask }}
  .level-left
    .level-item
      .tags.has-addons(v-if="worth")
        .tag.is-light Assets worth
        .tag.is-dark {{ worth }}

</template>

<script src="./script.js"></script>

<style scoped></style>
