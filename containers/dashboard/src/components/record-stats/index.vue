<template lang="pug">
.field.is-grouped
  .control
    .tags.has-addons
      .tag.is-light Count
      .tag.is-dark {{ count }}
  .control
    .tags.has-addons
      .tag.is-light Amount
      .tag.is-dark {{ amount }}
</template>

<script src="./script.js"></script>
