<template lang="pug">
  section.section
    .container
      .columns
        .column.is-8.is-offset-4
          the-chart(:value="records")

</template>

<script src="./main.js"></script>

<style>
tr.x-is-info {
  border-left: 1px solid #167df0;
}

tr.x-is-danger {
  border-left: 1px solid #167df0;
}
</style>


