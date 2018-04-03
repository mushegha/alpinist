<template lang="pug">

div
  .navbar.is-light
    .container
      .navbar-brand
        a.navbar-item(href="/")
          img(src="/assets/logo.png")
      .navbar-menu
        .navbar-start
          .navbar-item
            vue-clock

        wallet-navbar.navbar-end

  router-view

  .footer
    .container
      .content.has-text-centered
        a(href="/") Alpinist
        span &nbsp; by company behind the &nbsp;
        a(href="http://cleversniper.com") CleverSniper

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
