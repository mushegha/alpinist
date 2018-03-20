<template lang="pug">
  .panel
    .panel-heading
      | Lots
    .panel-block
      table.table.is-bordered.is-narrow.is-fullwidth(v-if="slots$")
        thead
          tr
            th #
            th Price
            th Worth
        tbody
          tr(v-for="(slot, index) in slots$")
            th {{ index }}
            td {{ slot.openPrice }}
            td {{ slot.investment }}
    .panel-block
      button.button.is-link.is-outlined.is-fullwidth(disabled)
        | Liquidate all assets

</template>

<script src="./script.js"></script>
