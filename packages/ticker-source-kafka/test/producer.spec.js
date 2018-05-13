import test from 'ava'

import Source from '..'

test.cb(t => {
  const ticker$ = new Source()

  ticker$
    .take(20)
    .subscribe(
      console.log,
      console.error,
      _ => t.end()
    )
})
