const columns = [
  {
    field: 'amount',
    label: 'Amount',
    numeric: true,
    // sortable: true
  },
  {
    field: 'investment',
    label: 'Investment (USD)',
    numeric: true
  },
  {
    field: 'priceOpen',
    label: 'Open Price (USD)',
    numeric: true,
    // sortable: true
  },
  {
    field: 'timeOpen',
    label: 'Open time',
    // sortable: true
  },
  {
    field: 'priceClose',
    label: 'Close Price (USD)',
    numeric: true,
    // sortable: true
  },
  {
    field: 'timeClose',
    label: 'Close time',
    // sortable: true
  },
  {
    field: 'profit',
    label: 'Profit (USD)'
  }
]

export default function () {
  return { columns }
}
