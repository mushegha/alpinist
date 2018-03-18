# Ticker monitor

## The flow

- Client connects to socket server
- Client emits a `subscribe` event with ticker params
- Server creates an observable RethinkDB cursor on `ticker` table
- Server emits back to socket realtime data
- Server closes cursor on client socket disconnect or unsubscribe

I won’t go into too much detail for the sake of brevity.
