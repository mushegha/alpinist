import TradersAll from '~/views/traders-all'
import TradersOne from '~/views/traders-one'

const routes = [
  {
    path: '/',
    component: TradersAll
  }, {
    path: '/:id',
    component: TradersOne
  }
]

export default routes
