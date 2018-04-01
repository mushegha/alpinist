<template lang="pug">
.field
  .control
    .tags.has-addons
      .tag.is-light Symbol
      .tag.is-dark {{ symbol }}
    .tags.has-addons
      .tag.is-light Bid
      .tag.is-dark {{ bid }}
    .tags.has-addons
      .tag.is-light Ask
      .tag.is-dark {{ ask }}
</template>

<script src="./script.js"></script>

<style scoped>
.chart {
  width: 100%;
  height: 420px;
}
</style>
