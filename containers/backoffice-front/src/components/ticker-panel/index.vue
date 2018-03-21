<template lang="pug">
  .panel
    .panel-heading
      | Ticker
    .panel-block
      div(v-if="last")
        p.field
          span.tag.is-medium
            | {{ last.bid }}
        p.field
          span.tag.is-medium
            | {{ last.ask }}
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
