const palindrome = require('./palindrome')

const root = (req, res) => {
  res('OK')
}

module.exports = {
  root,
  palindrome
}
