<template lang="pug">

div
  header.navbar.is-light
    nav.container
      .navbar-brand
        a.navbar-item(href="/")
          | Alpinist
      .navbar-menu
        .navbar-start

        wallet-navbar.navbar-end

  router-view

</template>

<script>
import WalletNavbar from '@/wallet-navbar'

const components = {
  WalletNavbar
}

export default {
  components
}

</script>
