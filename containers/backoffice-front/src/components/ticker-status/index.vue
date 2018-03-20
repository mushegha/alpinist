<template lang="pug">
  .panel
    .panel-heading
      | Ticker
    .panel-block
      div
        p.field
          span.tag.is-medium
            | {{ status$.bid }}
        p.field
          span.tag.is-medium
            | {{ status$.ask }}
</template>

<script src="./script.js"></script>
