import * as R from 'ramda'

import * as RA from 'ramda-adjunct'

/**
 * Actions
 */

export function compileBuyOrder (store, price) {
  const { commit, getters } = store

  const {
    init,
    upBX,
    downKX
  } = store.state

  const head         = getters['lots/head']
  const foot         = getters['lots/foot']
  const shouldBuyFor = getters['lots/shouldBuyFor']
  const isNextHead   = getters['lots/isNextHead']
  const isNextFoot   = getters['lots/isNextFoot']

  if (!shouldBuyFor(price)) return []

  const orderOf = R.compose(
    R.evolve({ worth: R.negate }),
    R.pick(['tid', 'worth'])
  )

  const slot = {
    tid: Date.now(),
    price,
    worth: init
  }

  if (isNextHead(price)) {
    slot.worth = head.worth + upBX
  }
  else if (isNextFoot(price)) {
    slot.worth = foot.worth * downKX
  }

  commit('lots/APPEND', slot)
  commit('ledger/PUT', orderOf(slot))
}


export function compileSellOrder (store, price) {
  const { commit, getters } = store

  const shouldSellFor = getters['lots/shouldSellFor']
  const takeUntil     = getters['lots/takeUntil']

  const orderOf = R.compose(
    worth => ({ worth, tid: Date.now() }),
    R.sum,
    R.map(weight => weight * price),
    R.map(({ worth, price }) => worth / price)
  )

  if (!shouldSellFor(price)) return []

  const slots = takeUntil(price)

  // acquire

  commit('lots/REJECT', slots)
  commit('ledger/PUT', orderOf(slots))
}

export function tick ({ commit, dispatch, getters }, payload) {
  const { bid, ask, tid = Date.now() } = payload

  dispatch('ticker/update', { bid, ask, tid })

  dispatch('compileBuyOrder', ask)
  dispatch('compileSellOrder', bid)
}
