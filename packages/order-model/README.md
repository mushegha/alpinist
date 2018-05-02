# Order Model

## Data Structures

### Order

```json
{
  "_id"      : "000XAL6S41ACTAV9WEVGEMMVR8",
  "status"   : "new",
  "side"     : "buy",
  "type"     : "market",
  "symbol"   : "ethusd",
  "exchange" : "bitfinex",
  "amount"   : 0.1,
  "price"    : 500
}
```

### Order Collection

```json
[
  {
    "_id"      : "000XAL6S41ACTAV9WEVGEMMVR8",
    "status"   : "new",
    "side"     : "buy",
    "type"     : "market",
    "symbol"   : "ethusd",
    "exchange" : "bitfinex",
    "amount"   : 0.1,
    "price"    : 500
  }, {
    "_id"      : "000XAL6S41ACTAV9WEVGEMMVR9",
    "status"   : "new",
    "side"     : "sell",
    "type"     : "market",
    "symbol"   : "ethusd",
    "exchange" : "bitfinex",
    "amount"   : 0.2,
    "price"    : 400
  }
]
```

### Aggregate Order

```json
{
  "_id"    : "000XAL6S41ACTAV9WEVGEMMVRA",
  "status" : "new",
  "side"   : "sell",
  "type"   : "market",
  "symbol" : "ethusd",
  "market" : "bitfinex",
  "amount" : 0.1,
  "price"  : 300,
  "members": [
    {
      "_id"      : "000XAL6S41ACTAV9WEVGEMMVR8",
      "status"   : "new",
      "side"     : "buy",
      "type"     : "market",
      "symbol"   : "ethusd",
      "exchange" : "bitfinex",
      "amount"   : 0.1,
      "price"    : 500
    }, {
      "_id"      : "000XAL6S41ACTAV9WEVGEMMVR9",
      "status"   : "new",
      "side"     : "sell",
      "type"     : "market",
      "symbol"   : "ethusd",
      "exchange" : "bitfinex",
      "amount"   : 0.2,
      "price"    : 400
    }
  ]
}
```


