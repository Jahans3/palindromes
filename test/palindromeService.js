const { expect } = require('chai')
const { palindrome: palindromeService } = require('../src/services')

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

  describe('getPalindromes', () => {
    it('should return an array of palindromes when they have previously been sent to the service', done => {
      const palindrome = 'A but tuba.'
      palindromeService.isPalindrome({ palindrome })
      const palindromes = palindromeService.getPalindromes()

      expect(palindromes).to.be.an('array')
      expect(palindromes[0]).to.be.an('object')
      expect(palindromes[0].palindrome).to.equal(palindrome)
      done()
    })

    it('should return an empty array when no palindromes have been passed to the server', done => {
      palindromeService.clearPalindromes()
      const palindromes = palindromeService.getPalindromes()

      expect(palindromes).to.have.all.members([])
      expect(palindromes.length).to.equal(0)
      done()
    })
  })

  describe('clearPalindromes', () => {
    it('should empty the palindromesStore', done => {
      const palindrome = 'A but tuba.'
      palindromeService.isPalindrome({ palindrome })
      const palindromes = palindromeService.getPalindromes()

      expect(palindromes[0].palindrome).to.equal(palindrome) // ensure store is populated

      palindromeService.clearPalindromes()

      const clearedPalindromesStore = palindromeService.getPalindromes()

      expect(clearedPalindromesStore).to.be.an('array')
      expect(clearedPalindromesStore).to.have.all.members([])
      expect(clearedPalindromesStore.length).to.equal(0)
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

  describe('cleanPalindromeStore', () => {
    it('should remove all elements of an array that are older than a given amount of minutes', done => {
      const palindrome = 'A but tuba.'
      palindromeService.isPalindrome({palindrome})
      const palindromes = palindromeService.getPalindromes()
      const palindromesLength = palindromes.length

      setInterval(() => {
        const expiry = 0.01
        palindromeService.cleanPalindromeStore({ expiry })
        const updatedPalindromes = palindromeService.getPalindromes()
        const updatedPalindromesLength = updatedPalindromes.length
        expect(updatedPalindromesLength).to.not.equal(palindromesLength)
        done()
      }, 1000)
    })
  })
})
