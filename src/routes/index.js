const { root } = require('../controllers')
const palindrome = require('./palindrome')

const routes = ({ server }) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: root
  })

  palindrome({ server })

  server.start(() => { console.log(`Server started at: ${server.info.uri}`) })
}

module.exports = routes
