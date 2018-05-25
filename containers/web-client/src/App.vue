<template lang="pug">
  el-container
    el-header
      app-navbar
    el-main
      router-view.wrapper
</template>

<script>
import AppNavbar from './components/app-navbar'

export default {
  name: 'App',
  components: {
    AppNavbar
  }
}
</script>

<style>
.wrapper {
  width: 960px;
  margin: 20px auto;
}
</style>
