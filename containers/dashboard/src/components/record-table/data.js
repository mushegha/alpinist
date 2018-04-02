const columns = [
  {
    field: 'amount',
    label: 'Amount',
    numeric: true,
    // sortable: true
  },
  {
    field: 'investment',
    label: 'Investment',
    numeric: true
  },
  {
    field: 'priceOpen',
    label: 'Open Price',
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
    label: 'Close Price',
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
    label: 'Profit'
  }
]

export default function () {
  return { columns }
}
