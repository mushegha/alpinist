# Interface

Web client is built using Vue.js and co. As UI framework ElementUI is used.

Client consists of 3 main pages and 2 pages for agent create/update operations

## Tickers page 

Displays information about currently active tickers.

## Agents list page 

Displays agents. 

Multiple agents could be created for different brokers (currently Bitfinex and CEX.IO) and different pairs.

## Agent page 

Displays one agent's orders, and edit / switch features

### Agent create/update pages

Create only

- Select broker and currency pair

Both create and update

- Initial investment
- Price threshold
- Initial buy-in size
- Linear coefficients for buy-in size
  - when price goes up
  - when price goes down
- Number of sell and keep limits


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

