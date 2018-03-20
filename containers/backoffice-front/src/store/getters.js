import * as R from 'ramda'

export function shouldBuyFor (state, getters) {
  const { init, step } = state

  const isFirst = price => {
    const card = getters['lots/card']
    return card === 0
  }

  const isNextHead = price => {
    const head = getters['lots/head']
    return head && head.price + step <= price
  }

  const isNextFoot = price => {
    const foot = getters['lots/foot']
    return foot && foot.price - step >= price
  }

  const exo = R.anyPass([
    isFirst,
    isNextHead,
    isNextFoot
  ])

  return exo
}

export function shouldSellFor (state, getters) {

  return price => {

  }
}
