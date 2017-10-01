const { palindrome: palindromeService } = require('../services')

const GET = (req, res) => {
  palindromeService.cleanPalindromeStore()
  const palindromes = palindromeService.getPalindromeStore()

  res(palindromes)
}

const POST = (req, res) => {
  const { payload = '' } = req
  const { palindrome = '' } = palindromeService.safeParse({ string: payload })
  const isPalindrome = palindromeService.isPalindrome({ palindrome })

  if (isPalindrome) {
    palindromeService.dispatchToPalindromeStore({ palindrome })
    palindromeService.trimPalindromeStore()
  }

  res(isPalindrome)
}

module.exports = {
  GET,
  POST
}
