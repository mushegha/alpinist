# Algorithm

Algorithm is based on scalping strategy.

## Steps

- On first step agent acquires crypto based on initial investment
- On price change, where price goes up or down by given threshold, it acquires
  next step
- Similarly, on each price change from min/max of current positions, it acquires
  if doesn't already hold order on that position. Amount of each next buy can be
  configured lineary based on previous order.
- When price goes up so that given number of orders are profitable, agent should
  sell given number of orders from bottom and keep given number of orders (see
  config)

## Notes

Tests for algorithm could be found on `containers/agent-server/test`
