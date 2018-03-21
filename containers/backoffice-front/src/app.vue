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
          scope-dropdown

  router-view

</template>

<script>

import ScopeDropdown from '@/scope-dropdown'

const components = {
  ScopeDropdown
}

export default {
  components
}

</script>
