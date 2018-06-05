<template lang="pug">
  div
    .navbar
      .details

      .actions
        el-button(
          type="primary"
          icon="el-icon-plus"
          @click="create")
          | Create Agent
    div(style="padding-top: 20px;")
      agent-table(:dataset="agents")
</template>

<style scoped>
.navbar {
  display: flex;
  padding: 5px 5px 15px;
}

.navbar .details {
  display: flex;
  flex: 1;
}

.navbar .actions { }
</style>

<script src="./main.js"></script>
