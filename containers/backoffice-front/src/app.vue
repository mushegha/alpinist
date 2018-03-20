<template lang="pug">

div
  header.navbar.is-light
    nav.container
      .navbar-brand
        a.navbar-item(href="/")
          | Alpinist
      .navbar-menu
        .navbar-start

        .navbar-end
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link(href="/bitfinex/btcusd")
              | Bitfinex / BTCUSD
            .navbar-dropdown.is-right
              a.navbar-item(href="/bitfinex/btceur")
                | Bitfinex / BTCEUR
              a.navbar-item(href="/bitfinex/neousd")
                | Bitfinex / NEOUSD
              hr.navbar-divider
              a.navbar-item(href="/mock/btcusd")
                | Mock / BTCUSD

  section.section
    .container
      .columns
        .column.is-3
          ladder-status
        .column.is-9
          ticker-status

</template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>

    <div class="navbar-burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</nav>
<script>

import TickerStatus from '@/ticker-status'
import LadderStatus from '@/ladder-status'

const components = {
  TickerStatus,
  LadderStatus
}

export default {
  components
}

</script>
