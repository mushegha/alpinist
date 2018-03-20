import Router from 'vue-router'

import SymbolScope from '~/views/symbol-scope'

const routes = [
  {
    path: '/:provider/:pair',
    component: SymbolScope,
    props: true
  }
]

const options = {
  routes,
  mode: 'history'
}

export default new Router(options)
