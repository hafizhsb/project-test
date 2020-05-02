'use strict'

const Hapi = require('@hapi/hapi')
const HapiPostgresConnection = require('hapi-postgres-connection')
const HapiPino = require('hapi-pino')
var fs = require('fs')
require('dotenv').config()
process.env.ROOT_DIR = __dirname

const productRoutes = require('./products/productRoutes')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    debug: {request: ['error']},
  })

  // register plugins
  await server.register([
    {
      plugin: HapiPostgresConnection,
    },
    {
      plugin: HapiPino,
      options: {
        prettyPrint: process.env.NODE_ENV !== 'production',
        stream:
          process.env.LOGS_TO_FILE === 'true'
            ? require('fs').createWriteStream('./logs/output')
            : false,
      },
      level: 'info',
    },
    require('@hapi/inert'),
  ])

  // Routing
  const defaultRoute = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.response('hello world').code(200)
    },
  }
  server.route({
    method: 'GET',
    path: '/uploads/{param*}',
    handler: {
      directory: {
        path: process.env.UPLOAD_PATH,
      },
    },
  })
  server.route(defaultRoute)
  server.route(productRoutes)

  await server.start()
  server.log('info', `Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log('error', err)
  process.exit(1)
})

init()
