import {
  mapState,
  mapActions
} from 'vuex'

import {
  isEmpty,
  identity
} from 'ramda'

function data () {
  return {
    passphrase: null
  }
}

const computed = {
  ...mapState({ body: 'auth' })
}

const methods = {
  login () {
    const { passphrase } = this

    this
      .auth({ passphrase })
      .then(() => {
        this.$router.push('/')
      })
  },
  ...mapActions('auth', ['auth'])
}

function beforeMount () {

}

export default {
  name: 'view-auth-login',
  data,
  methods,
  computed,
  beforeMount
}
