<template lang="pug">
  section.section
    .container
      .level
        .level-right
          .level-item
            a(:href="'/' + id")
              | Back to dashboard
        .level-left
          .level-item
            .tags.has-addons
              .tag.is-light Total P/L
              .tag.is-dark {{ total }}
      div(v-if="rows")
        b-table(
          :columns="columns"
          :data="data"
          :paginated="true"
          :per-page="50"
          :row-class="row => row.xClass"
          :hoverable="true"
        )

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


