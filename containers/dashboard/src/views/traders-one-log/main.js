import { mapActions } from 'vuex'

import {
  compose,
  is,
  always,
  isEmpty,
  head,
  assoc,
  map,
  reduce
} from 'ramda'

import { format } from 'date-fns'

const props = ['id']

function data () {
  return {
    rows: null,
    columns: [
      {
        field: 'priceInitial',
        label: 'Initial price',
        numeric: true,
        sortable: true
      },
      {
        field: 'priceFinal',
        label: 'Final price',
        numeric: true,
        sortable: true
      },
      {
        field: 'amount',
        label: 'Amount',
        numeric: true,
        sortable: true
      },
      {
        field: 'profit',
        label: 'P/L',
        numeric: true,
        sortable: true
      },
      {
        field: 'dateOpened',
        label: 'Open time',
        sortable: true
      },
      {
        field: 'dateClosed',
        label: 'Close time',
        sortable: true
      }
    ]
  }
}

const methods = {
  ...mapActions('record', [
    'fetchAllOf'
  ])
}

const computed = {
  data () {
    if (!this.rows) return void 0

    const calc = record => {
      const { amount, priceInitial, priceFinal } = record
      const profit = (priceFinal - priceInitial) * amount

      return Number.isNaN(profit)
        ? record
        : assoc('profit', profit, record)
    }

    const mark = record => {
      if (record.profit < 0) {
        return assoc('xClass', 'x-is-danger', record)
      }

      if (!record.dateClosed) {
        return assoc('xClass', 'x-is-info', record)
      }

      return record
    }

    const date = record => {
      const { dateOpened, dateClosed } = record

      record.dateOpened = format(
        new Date(dateOpened),
        'MM/DD/YYYY HH:mm:ss'
      )

      if (dateClosed)
        record.dateClosed = format(
          new Date(dateClosed),
          'MM/DD/YYYY HH:mm:ss'
        )

      return record
    }

    const fn = compose(mark, calc, date)

    return map(fn, this.rows)
  },
  total () {
    if (!this.data) return void 0

    const calc = (acc, record) => {
      const { profit } = record

      const skip = Number.isNaN(profit)
        || typeof profit !== 'number'

      return skip
        ? acc
        : acc + profit
    }

    return reduce(calc, 0, this.data)
  }
}

async function beforeMount () {
  this
    .fetchAllOf(this.id)
    .then(data => {
      this.rows = data
    })
}

export default {
  name: 'view-traders-one-log',
  props,
  data,
  methods,
  beforeMount,
  computed
}
