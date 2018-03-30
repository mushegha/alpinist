import TradersAll from '~/views/traders-all'
import TradersOne from '~/views/traders-one'
import TradersOneEdit from '~/views/traders-one-edit'

const routes = [
  {
    path: '/',
    component: TradersAll
  }, {
    path: '/:id',
    component: TradersOne,
    props: true
  }, {
    path: '/:id/edit',
    component: TradersOneEdit,
    props: true
  }
]

export default routes
