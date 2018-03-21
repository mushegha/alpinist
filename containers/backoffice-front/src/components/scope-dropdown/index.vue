<template lang="pug">
  b-dropdown(:hoverable="true" position="is-bottom-left")
    .navbar-item(slot="trigger")
      span bitfinex/exo

    b-dropdown-item.has-link
      a(href="/")
        | exo
</template>

<script src="./script.js"></script>
