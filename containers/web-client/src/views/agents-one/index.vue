<template lang="pug">
  div(v-if="model")
    header
      h3 {{ id }}
      agent-switch(:id="id")
      ticker-monitor(:target="model.ticker")

    aside
      router-link(:to="{name: 'agents-one-edit', params: { id }}")
        | Edit

    order-table(:dataset="orders")
</template>

<script src="./main.js"></script>
