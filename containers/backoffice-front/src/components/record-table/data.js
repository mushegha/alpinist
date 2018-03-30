const columns = [
  {
    field: 'priceInitial',
    label: 'Initial price',
    numeric: true
  },
  {
    field: 'amount',
    label: 'Amount',
    numeric: true
  },
  {
    field: 'symbol',
    label: 'Symbol'
  },
  {
    field: 'time',
    label: 'Open time'
  }
]

export default function () {
  return { columns }
}
