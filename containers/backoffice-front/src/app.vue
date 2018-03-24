<template lang="pug">

div
  header.navbar.is-light
    nav.container
      .navbar-brand
        a.navbar-item(href="/")
          | Alpinist
      .navbar-menu
        .navbar-start
          .navbar-item
            vue-clock

        wallet-navbar.navbar-end

  router-view

</template>

<script>

import WalletNavbar from '@/wallet-navbar'

import VueClock from 'vue-clock-simple'

const components = {
  WalletNavbar,
  VueClock
}

export default {
  components
}

</script>
