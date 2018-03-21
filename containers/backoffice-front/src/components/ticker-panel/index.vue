<template lang="pug">
  .panel
    .panel-heading
      .level
        .level-right
          .level-item
            | Ticker
        .level-left(v-if="last")
          .level-item
            .tag.is-medium.is-info {{ last.bid }}
          .level-item
            .tag.is-medium.is-warning {{ last.ask }}
    .panel-block
      ticker-chart.chart
</template>

<script src="./script.js"></script>

<style scoped>
.chart {
  width: 100%;
  height: 420px;
}
</style>
