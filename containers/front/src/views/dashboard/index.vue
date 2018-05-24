<template lang="pug">
  div#dashboard
    .navbar
      .details
        | Exo
      .actions
        el-button(
          type="primary"
          icon="el-icon-plus"
          circle)
    div(style="padding-top: 20px;")
      agent-table(:dataset="agents")
</template>

<style scoped>

#dashboard {
  width: 960px;
  margin-left: auto;
  margin-right: auto;
}

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
