import TickerPanel from '@/ticker-panel'
// import LadderStatus from '@/ladder-status'

const components = {
  TickerPanel,
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
