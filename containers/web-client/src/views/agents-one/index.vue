<template lang="pug">
  div(v-if="model")
    .navbar
      .details
        ticker-monitor(:target="model.ticker")

      .status
        agent-switch(:id="id")

      .actions
        el-button(@click="edit")
          | Edit

    order-table(:dataset="orders" :ticker="tickerData")
</template>

<script src="./main.js"></script>

<style scoped>
.navbar {
  display: flex;
  padding: 5px 5px 15px;
}

.navbar .details {
  display: flex;
  flex: 1;
}

.navbar .status {
  padding: 10px 20px;
}
.navbar .actions { }
</style>
