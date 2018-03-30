import { reduce } from 'ramda'

const props = ['rows']

const computed = {
  count () {
    return this.rows.length
  },
  amount () {
    const sum = (acc, row) => {
      return acc + row.amount
    }

    return reduce(sum, 0, this.rows)
  }
}

export default {
  props,
  computed
}
