import Router from 'vue-router'

import SymbolScope from '~/views/symbol-scope'

const routes = [
  { path: '', component: SymbolScope }
]

const router = new Router({
  routes
})

export default router
