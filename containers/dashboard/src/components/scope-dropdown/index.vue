<template lang="pug">
  b-dropdown(
    v-model="activeScope.id"
    :hoverable="true"
    position="is-bottom-left"
  )
    .navbar-item(slot="trigger")
      | {{ activeScope.id }}

    b-dropdown-item.has-link(
      v-for="scope in scopes"
      :key="scope.id"
      :value="scope.id"
    )
      router-link(:to="{ path: 'dashboard', query: scope.query }")
        | {{ scope.id }}
</template>

<script src="./script.js"></script>
