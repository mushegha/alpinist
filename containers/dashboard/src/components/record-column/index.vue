<template lang="pug">
div.wrapper
  div(v-if="rows && rows.length")
    the-chart(:value="rows")
    record-table(:rows="rows")
</template>

<script src="./script.js"></script>
