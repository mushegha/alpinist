<template lang="pug">
  b-dropdown(:hoverable="true" position="is-bottom-left")
    .navbar-item(slot="trigger")
      | {{ activeScope.id }}

    b-dropdown-item.has-link(
      v-for="scope in scopes"
      :key="scope.id"
    )
      router-link(:to="{ path: 'dashboard', query: scope.data }")
        | {{ scope.id }}
</template>

<script src="./script.js"></script>
