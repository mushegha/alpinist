import { mapGetters } from 'vuex'

const props = {
  id: String
}

const computed = {
  ...mapGetters({
    'byId': 'agents/byId'
  }),
  model () {
    return this.byId(this.id)
  }
}

export default {
  name: 'agents-one',
  props,
  computed
}
