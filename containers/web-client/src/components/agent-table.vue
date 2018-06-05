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
        pre
          var {{ scope.row.id | truncate }}

    el-table-column(
      label="Broker"
      prop="ticker.broker"
      sortable)

    el-table-column(
      label="Symbol"
      prop="ticker.symbol")

    el-table-column(
      label="Status"
      align="right")

      template(slot-scope="scope")

        agent-switch(:id="scope.row.id")

    el-table-column(
      label="Actions"
      align="right")

      template(slot-scope="scope")

        el-button(
          size="small"
          @click="view(scope.row)")
          | View

        el-button(
          size="small"
          @click="edit(scope.row)")
          | Edit
</template>

<script>
import AgentSwitch from '@/components/agent-switch'

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

const methods = {
  view (params) {
    const name = 'agents-one'
    this.$router.push({ name, params })
  },
  edit (params) {
    const name = 'agents-one-edit'
    this.$router.push({ name, params })
  }
}

export default {
  name: 'agent-table',
  props,
  filters,
  methods,
  components: {
    AgentSwitch
  }
}
</script>
