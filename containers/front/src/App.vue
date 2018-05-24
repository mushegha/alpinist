<template lang="pug">
  el-container
    el-header
      app-navbar
    el-main
      router-view
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

<style> </style>
