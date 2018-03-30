import {
  map,
  assoc
} from 'ramda'

import { format } from 'date-fns'

export function data () {
  const transform = record => {
    const date = new Date(record.dateOpened)
    const time = format(date, 'HH:mm:ss')

    return assoc('time', time, record)
  }

  return map(transform, this.rows)
}
