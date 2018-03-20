<template lang="pug">

section#body.section
  header
  main.container
    div
      ticker-status
    div
      ladder-status

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
