<template lang="pug">
  el-container
    el-header Header
    el-main
      img(src="./assets/logo.png")
      router-view
    el-footer Footer
</template>

<script>
export default {
  name: 'App'
}
</script>

<style> </style>
