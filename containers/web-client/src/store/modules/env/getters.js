import {
  groupBy,
  prop,
  map,
  compose
} from 'ramda'

const symbolsByBrokers = compose(
  map(map(prop('symbol'))),
  groupBy(prop('broker')),
  prop('tickers')
)

export {
  symbolsByBrokers
}
