import {
  map,
  assoc,
  compose
} from 'ramda'

import { format } from 'date-fns'

export function data () {
  const transform = record => {
    const { amount, priceInitial, dateOpened } = record

    const time = format(new Date(dateOpened), 'HH:mm:ss')
    const investment = amount * priceInitial

    const fn = compose(
      assoc('time', time),
      assoc('investment', investment)
    )

    return fn(record)
  }

  return map(transform, this.rows)
}
