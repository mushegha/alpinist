<template>
  <el-container id="app">
    <el-header>Header</el-header>
    <el-main>
      <img src="./assets/logo.png">
      <router-view/>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style> </style>
