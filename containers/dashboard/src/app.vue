<template lang="pug">

div.site
  .navbar.is-light
    .container
      .navbar-brand
        a.navbar-item(href="/")
          img(src="/assets/logo.png")
      .navbar-menu
        .navbar-start
          .navbar-item
            vue-clock

        wallet-navbar.navbar-end(v-if="isAdmin")

  .main
    template(v-if="isAdmin")
      router-view
    template(v-else)
      auth-login

  .footer
    .container
      .content.has-text-centered
        strong Alpinist
        span &nbsp; strategy implementation at &nbsp;
        a(href="https://www.talisant.com/") CleverSniper Network

</template>

<script>

import WalletNavbar from '@/wallet-navbar'
import AuthLogin from './views/auth-login'

import VueClock from 'vue-clock-simple'

const components = {
  AuthLogin,
  WalletNavbar,
  VueClock
}

const computed = {
  isAdmin () {
    const { auth } = this.$store.state
    return auth && auth.token
  }
}

export default {
  components,
  computed
}

</script>

<style>
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site .main {
  flex: 1;
}
</style>
