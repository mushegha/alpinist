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
        router-link(:to="`/agents/${scope.row.id}`")
          | {{ scope.row.id | truncate }}

    el-table-column(
      label="Broker"
      prop="target.broker"
      sortable)

    el-table-column(
      label="Symbol"
      prop="target.symbol")
</template>

<script>

const props = {
  dataset: Array
}

const filters = {
  truncate (str) {
    return str.length > 16
      ? str.slice(0, 8) + '…' + str.slice(-8)
      : str
  }
}

export default {
  name: 'agent-table',
  props,
  filters
}
</script>
