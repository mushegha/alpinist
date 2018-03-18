const { Server } = require('ws')

const handleConnection = require('./lib')

const port = process.env.NODE_PORT || 8080

const wss = new Server({ port })

wss.on('connection', handleConnection)
