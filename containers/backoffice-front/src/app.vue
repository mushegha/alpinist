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

  router-view

</template>

<script>

const components = { }

export default {
  components
}

</script>
