import TickerStatus from '@/ticker-status'
// import LadderStatus from '@/ladder-status'

const components = {
  TickerStatus,
  // LadderStatus
}

const computed = {
  target () {
    return this.$route.query
  }
}

export default {
  name: 'the-dashboard-view',
  components,
  computed
}
