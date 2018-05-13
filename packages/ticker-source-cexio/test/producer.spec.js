import test from 'ava'

import Source from '..'

test.cb(t => {
  const symbols = [
    'ethusd',
    'btcusd'
  ]

  const ticker$ = new Source(symbols)

  ticker$
    .take(1)
    .subscribe(
      console.log,
      console.error,
      _ => t.end()
    )
})
