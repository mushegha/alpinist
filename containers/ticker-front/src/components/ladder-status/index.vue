<template lang="pug">
  .panel
    .panel-heading
      | Lots
    .panel-block
      ul(v-if="slots$")
        li(v-for="slot in slots$")
          | {{ slot.openPrice }}
</template>

<script src="./script.js"></script>
