# Order Model

## Data Structures

### Aggregate Order

```json
{
  "subject" : "000XAL6S41ACTAV9WEVGEMMVRA",
  "agent"   : "000YAL6S41ACTAV9WEVGEMMVR1",
  "status"  : "new",
  "type"    : "market",
  "symbol"  : "ethusd",
  "market"  : "bitfinex",
  "members" : [
    {
      "subject" : "000XAL6S41ACTAV9WEVGEMMVR8",
      "side"    : "buy",
      "amount"  : 0.1,
      "price"   : 500
    }, {
      "subject" : "000XAL6S41ACTAV9WEVGEMMVR9",
      "side"    : "sell",
      "amount"  : 0.2,
      "price"   : 400
    }
  ]
}
```


