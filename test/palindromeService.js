const { palindrome: palindromeService } = require('../src/services')

describe('Palindrome Service', () => {
  describe('isPalindrome', () => {
    const { isPalindrome } = palindromeService

    it('should return false if no string is passed', done => {
      const noString = isPalindrome()

      if (!noString) return done()
    })

    it('should return false if a palindrome isn\'t passed', done => {
      const palindrome = 'Hello I am not a palindrome'
      const notPalindrome = isPalindrome({ palindrome })

      if (!notPalindrome) return done()
    })

    it('should return true if a palindrome is passed', done => {
      const palindrome = 'A but tuba.'
      const isAPalindrome = isPalindrome({ palindrome })

      if (isAPalindrome) return done()
    })
  })
})
