const { API_PATH } = require('../constants')
const { root } = require('../controllers')

const routes = ({ server }) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: root
  })

  // add palindrome-specific routes here

  server.start(() => { console.log(`Server started at: ${server.info.uri}`) })
}

module.exports = routes
