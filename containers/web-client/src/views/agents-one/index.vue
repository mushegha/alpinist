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

    .bottom-bar
      order-export.right(
        :id="id"
        :ticker="tickerData"
        :dataset="orders")
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

.bottom-bar {
  padding: 20px 0;
  clear: both;
}

.bottom-bar .right {
  float: right;
}
</style>
