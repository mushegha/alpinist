<template lang="pug">
.panel
  a.panel-block(:href="'/' + id + '/edit'")
    | Edit Configuration
  a.panel-block(@click.prevent="destroyTrader")
    | Destroy instance
</template>

<script src="./script.js"></script>

<style scoped>
.field-label {
  flex-grow: 1;
}
.field-body {
  flex-grow: 2;
}
.button {
  width: 100%;
}
</style>
