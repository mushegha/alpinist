import {
  mapState,
  mapGetters
} from 'vuex'

const computed = {
  ...mapState(['scopes']),
  ...mapGetters(['activeScope']),
}

export default {
  name: 'scope-dropdown',
  computed
}
