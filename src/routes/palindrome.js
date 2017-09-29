const { API_PATH } = require('../constants')
const { palindrome: { GET, POST } } = require('../controllers')

const palindrome = ({ server }) => {
  server.route({
    method: 'GET',
    path: `${API_PATH}palindromes`,
    handler: GET
  })

  server.route({
    method: 'POST',
    path: `${API_PATH}palindromes`,
    handler: POST
  })
}

module.exports = palindrome
