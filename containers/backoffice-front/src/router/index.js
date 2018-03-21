import Router from 'vue-router'

import routes from './routes'

const options = {
  routes,
  mode: 'history',
  linkExactActiveClass: 'is-active'
}

export default new Router(options)
