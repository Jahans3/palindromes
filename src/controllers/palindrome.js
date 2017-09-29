const { palindrome: palindromeService } = require('../services')

const GET = (req, res) => {
  // palindromeService.getPalindromes
  res('GET')
}

const POST = (req, res) => {
  // palindromeService.isPalindrome
  res('POST')
}

module.exports = {
  GET,
  POST
}
