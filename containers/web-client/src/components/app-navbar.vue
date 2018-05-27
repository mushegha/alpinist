<template lang="pug">
  el-menu(
    mode="horizontal"
    router="true")

    el-menu-item(index="/agents")
      | Agents

    el-menu-item(index="/tickers")
      | Tickers

    el-menu-item(index="/orders")
      | Orders
</template>

<script>
export default {
  name: 'app-navbar'
}
</script>
