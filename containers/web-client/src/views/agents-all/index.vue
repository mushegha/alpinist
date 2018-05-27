<template lang="pug">
  div
    .navbar
      .details
        | Exo
      .actions
        router-link(:to="{ name: 'agents-new' }")
          | Create
    div(style="padding-top: 20px;")
      agent-table(:dataset="agents")
</template>

<style scoped>
.navbar {
  display: flex;
  padding: 5px 5px 15px;
  border-bottom: 1px solid #e6e6e6;
}

.navbar .details {
  display: flex;
  flex: 1;
}

.navbar .actions {

}
</style>

<script src="./main.js"></script>
