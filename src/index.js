require('dotenv').config()
const { Server } = require('hapi')
const routes = require('./routes')

const server = new Server()
const options = {
  host: process.env.HOST_NAME,
  port: process.env.PORT || 8080
}

server.connection(options)

routes({ server })
