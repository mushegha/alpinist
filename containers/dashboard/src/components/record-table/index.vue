<template lang="pug">
div
  aside.level
    .level-item
      .field
        b-switch(v-model="hideHistory") Open positions only
  b-table(
    :data="data"
    :columns="columns"
  )

</template>

<script src="./script.js"></script>
