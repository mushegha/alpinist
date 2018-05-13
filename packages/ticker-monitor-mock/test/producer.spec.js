import test from 'ava'

import Producer from '..'

test.cb(t => {
  const ticker$ = new Producer()

  ticker$
    .take(10)
    .subscribe(
      console.log,
      console.error,
      _ => t.end()
    )
})
