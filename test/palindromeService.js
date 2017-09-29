const chai = require('chai')
const { palindrome: palindromeService } = require('../src/services')

const expect = chai.expect

describe('Palindrome Service', () => {
  describe('isPalindrome', () => {
    const { isPalindrome } = palindromeService

    it('should return false if no string is passed', done => {
      const noString = isPalindrome()

      expect(noString).to.equal(false)
      done()
    })

    it('should return false if a palindrome isn\'t passed', done => {
      const palindrome = 'Hello I am not a palindrome'
      const notPalindrome = isPalindrome({ palindrome })

      expect(notPalindrome).to.equal(false)
      done()
    })

    it('should return true if a palindrome is passed', done => {
      const palindrome = 'A but tuba.'
      const isAPalindrome = isPalindrome({ palindrome })

      expect(isAPalindrome).to.equal(true)
      done()
    })
  })

  describe('safeParse', () => {
    it('should return false when an invalid string object is given', done => {
      const string = '{ "key" ]'
      const parsed = palindromeService.safeParse({ string })

      expect(parsed).to.equal(false)
      done()
    })

    it('should return a JSON object when given a valid string object', done => {
      const string = '{ "key": "value" }'
      const parsed = palindromeService.safeParse({ string })

      expect(parsed.key).to.equal('value')
      expect(Object.keys(parsed)[0]).to.equal('key')
      done()
    })
  })
})
