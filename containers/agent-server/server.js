const TickerSource = require('@alpinist/ticker-source-kafka')

const AgentStore = require('./lib/agent-store')

const host = '178.62.246.62:2181'

const ticker$ = TickerSource({ host })

const agentStore = AgentStore()

function exec (ticker) {
  const execAll = agents => {
    if (agents.length === 0) return void 0

    console.log(agents)
  }

  return agentStore
    .getActiveAgentsByTicker(ticker)
    .then(execAll)
}

ticker$
  .subscribe(exec)
