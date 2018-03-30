const columns = [
  {
    field: 'priceInitial',
    label: 'Initial price',
    numeric: true,
    // sortable: true
  },
  {
    field: 'amount',
    label: 'Amount',
    numeric: true,
    // sortable: true
  },
  {
    field: 'symbol',
    label: 'Symbol'
  },
  {
    field: 'time',
    label: 'Open time',
    // sortable: true
  }
]

export default function () {
  return { columns }
}
