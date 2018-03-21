import Router from 'vue-router'

import TheDashboard from '~/views/the-dashboard'

const routes = [
  {
    path: '/dashboard',
    component: TheDashboard,
    props: true
  }
]

const options = {
  routes,
  mode: 'history'
}

export default new Router(options)
