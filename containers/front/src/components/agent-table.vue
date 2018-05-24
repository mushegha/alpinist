<template lang="pug">
  el-table(
    v-if="dataset"
    :data="dataset"
    stripe)

    el-table-column(type="expand")
      template(slot-scope="props")
        pre
          code {{ props.row }}

    el-table-column(
      label="Id"
      prop="id")
      template(slot-scope="scope")
        router-link(:to="`scope.row.id`")
          | {{ scope.row.id }}

    el-table-column(
      label="Date Created"
      prop="time")

    el-table-column(
      label="Broker"
      prop="broker"
      sortable)

    el-table-column(
      label="Symbol"
      prop="symbol")
</template>

<script>

const props = {
  dataset: Array
}

export default {
  name: 'agent-table',
  props
}
</script>
