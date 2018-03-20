<template lang="pug">

section#body.section
  header
  .container
    .columns
      .column.is-3
        ladder-status
      .column.is-9
        ticker-status

</template>

<script>

import TickerStatus from '@/ticker-status'
import LadderStatus from '@/ladder-status'

const components = {
  TickerStatus,
  LadderStatus
}

export default {
  components
}

</script>
