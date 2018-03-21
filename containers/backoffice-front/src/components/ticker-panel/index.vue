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
      ticker-chart
</template>

<script src="./script.js"></script>
