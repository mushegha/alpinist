import test from 'ava'

import Ticker from '../lib/observables/ticker'

test.serial.cb('usage', t => {
  Ticker('tBTCUSD')
    .take(2)
    .subscribe({
      next (x) {
        console.log(x)
      },
      complete () {
        setTimeout(() => t.end(), 2000)
      }
    })
})
