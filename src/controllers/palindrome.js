const { palindrome: palindromeService } = require('../services')

const GET = (req, res) => {
  const palindromes = palindromeService.getPalindromes()

  res(palindromes)
}

const POST = (req, res) => {
  const { payload = '' } = req
  const { palindrome } = palindromeService.safeParse({ string: payload })
  const isPalindrome = palindromeService.isPalindrome({ palindrome })

  res(isPalindrome)
}

module.exports = {
  GET,
  POST
}
