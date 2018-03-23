const Redis = require('ioredis')

const { multi } = require('getenv')

const options = multi({
  host: ['REDIS_HOST', 'localhost'],
  port: ['REDIS_PORT', 6379, 'int']
})

module.exports = new Redis(options)
