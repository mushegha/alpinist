<template lang="pug">
  div.card
    div.card-content(v-if="slots$")
      div(v-for="slot in slots$")
        | {{ slot.openPrice }}
</template>

<script src="./script.js"></script>
