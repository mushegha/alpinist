<template lang="pug">
  div
    header
      h3 {{ id }}

    order-table(:dataset="orders")
</template>

<script src="./main.js"></script>
