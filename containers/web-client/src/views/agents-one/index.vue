<template lang="pug">
  div(v-if="model")
    header
      h3 {{ id }}
      ticker-monitor(:target="model.ticker")

    order-table(:dataset="orders")
</template>

<script src="./main.js"></script>
