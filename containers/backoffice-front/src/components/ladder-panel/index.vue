<template lang="pug">
  .panel
    .panel-heading
      .level
        .level-left
          .level-item
            | Lots
        .level-right
          .level-item
            .tag.is-medium.is-dark {{ count }}
    ladder-panel-block(
      v-for="slot in rev"
      :details="slot"
      :key="slot._id"
    )
    .panel-block
      button.button.is-link.is-outlined.is-fullwidth(disabled)
        | Liquidate all assets

</template>

<script src="./script.js"></script>
