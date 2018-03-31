<template lang="pug">
div
  .navbar-item(v-for="row in rows")
    .tags.has-addons
      .tag.is-white {{ row.currency | toUpper }}
      .tag.is-dark {{ row.balance }}

</template>

<script src="./script.js"></script>
