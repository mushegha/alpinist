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

    el-table-column(
      label="Price"
      prop="price"
      sortable)

    el-table-column(
      label="Side"
      prop="side")

    el-table-column(
      label="Side"
      prop="side")

    el-table-column(
      label="Updated"
      align="right")

      template(slot-scope="scope")
        time {{ scope.row.time | asStandardTime }}
</template>

<script>

import { format as formatDate } from 'date-fns'

const props = {
  dataset: Array
}

const filters = {
  asStandardTime (time) {
    return formatDate(time, 'HH:mm:ss')
  },
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
