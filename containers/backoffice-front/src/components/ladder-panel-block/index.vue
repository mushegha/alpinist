<template lang="pug">
  .panel-block(:class="isProfit ? 'is-active' : ''")
    .field.is-grouped
      .control
        .tags.has-addons
          .tag.is-dark
            | Price
          .tag(:class="isProfit ? 'is-success' : 'is-danger'")
            | {{ price }}
      .control.is-pulled-right
        .tags.has-addons
          .tag.is-dark
            | Amount
          .tag.is-gray
            | {{ amount }}
</template>

<script src="./script.js"></script>

<style scoped>
.control { }
</style>
