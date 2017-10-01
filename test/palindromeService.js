const { expect } = require('chai')
const { palindrome: palindromeService } = require('../src/services')

describe('Palindrome Service', () => {
  describe('isPalindrome', () => {
    it('should return false if no string is passed', done => {
      palindromeService.clearPalindromeStore()

      const noString = palindromeService.isPalindrome()

      expect(noString).to.equal(false)
      done()
    })

    it('should return false if a palindrome isn\'t passed', done => {
      palindromeService.clearPalindromeStore()

      const palindrome = 'Hello I am not a palindrome'
      const notPalindrome = palindromeService.isPalindrome({ palindrome })

      expect(notPalindrome).to.equal(false)
      done()
    })

    it('should return true if a palindrome is passed', done => {
      palindromeService.clearPalindromeStore()

      const palindrome = 'A but tuba.'
      const isAPalindrome = palindromeService.isPalindrome({ palindrome })

      expect(isAPalindrome).to.equal(true)
      done()
    })
  })

  describe('getPalindromeStore', () => {
    it('should return an array of palindromes when they have previously been sent to the service', done => {
      palindromeService.clearPalindromeStore()

      const palindrome = 'A but tuba.'
      palindromeService.isPalindrome({ palindrome })
      const palindromes = palindromeService.getPalindromeStore()

      expect(palindromes).to.be.an('array')
      expect(palindromes[0]).to.be.an('object')
      expect(palindromes[0].palindrome).to.equal(palindrome)
      done()
    })

    it('should return an empty array when no palindromes have been passed to the server', done => {
      palindromeService.clearPalindromeStore()

      const palindromes = palindromeService.getPalindromeStore()

      expect(palindromes).to.have.all.members([])
      expect(palindromes.length).to.equal(0)
      done()
    })
  })

  describe('clearPalindromeStore', () => {
    it('should empty the palindromeStore', done => {
      palindromeService.clearPalindromeStore()

      const palindrome = 'A but tuba.'
      palindromeService.isPalindrome({ palindrome })
      const palindromes = palindromeService.getPalindromeStore()

      expect(palindromes[0].palindrome).to.equal(palindrome) // ensure store is populated

      palindromeService.clearPalindromeStore()

      const clearedPalindromesStore = palindromeService.getPalindromeStore()

      expect(clearedPalindromesStore).to.be.an('array')
      expect(clearedPalindromesStore).to.have.all.members([])
      expect(clearedPalindromesStore.length).to.equal(0)
      done()
    })
  })

  describe('safeParse', () => {
    it('should return false when an invalid string object is given', done => {
      palindromeService.clearPalindromeStore()

      const string = '{ "key" ]'
      const parsed = palindromeService.safeParse({ string })

      expect(parsed).to.equal(false)
      done()
    })

    it('should return a JSON object when given a valid string object', done => {
      palindromeService.clearPalindromeStore()

      const string = '{ "key": "value" }'
      const parsed = palindromeService.safeParse({ string })

      expect(parsed.key).to.equal('value')
      expect(Object.keys(parsed)[0]).to.equal('key')
      done()
    })
  })

  describe('cleanPalindromeStore', () => {
    it('should remove all elements of an array that are older than a given amount of minutes', done => {
      palindromeService.clearPalindromeStore()

      const palindrome = 'A but tuba.'
      palindromeService.isPalindrome({palindrome})
      const palindromes = palindromeService.getPalindromeStore()
      const palindromesLength = palindromes.length

      setInterval(() => {
        const expiry = 0.01
        palindromeService.cleanPalindromeStore({ expiry })
        const updatedPalindromes = palindromeService.getPalindromeStore()
        const updatedPalindromesLength = updatedPalindromes.length
        expect(updatedPalindromesLength).to.not.equal(palindromesLength)
        done()
      }, 1000)
    })
  })

  describe('compareElements', () => {
    it('should return false if an argument is not an array', done => {
      palindromeService.clearPalindromeStore()

      const value = []
      const other = ''
      const result = palindromeService.compareElements({ value, other })

      expect(result).to.equal(false)
      done()
    })

    it('should return false if the given arrays are not of an equal length', done => {
      palindromeService.clearPalindromeStore()

      const value = [1, 2, 3]
      const other = [1, 2]
      const result = palindromeService.compareElements({ value, other })

      expect(result).to.equal(false)
      done()
    })

    it('should return true if the elements of the given arrays match one another at their respective indices', done => {
      palindromeService.clearPalindromeStore()

      const value = [1, 2, 'c', 'd', 5]
      const other = [1, 2, 'c', 'd', 5]
      const result = palindromeService.compareElements({ value, other })

      expect(result).to.equal(true)
      done()
    })
  })

  describe('dispatchToPalindromeStore', () => {
    it('should add the given string to the palindromeStore', done => {
      palindromeService.clearPalindromeStore()
      const palindrome = '12321'
      palindromeService.dispatchToPalindromeStore({ palindrome })
      const palindromeStore = palindromeService.getPalindromeStore()

      expect(palindromeStore.length).to.equal(1)
      done()
    })

    it('should add an ID and timestamp to each palindrome added to the store', done => {
      palindromeService.clearPalindromeStore()

      const palindrome = '12321'
      palindromeService.dispatchToPalindromeStore({ palindrome })
      const palindromeStore = palindromeService.getPalindromeStore()

      expect(palindromeStore[0].id).to.be.ok
      expect(palindromeStore[0].created).to.be.ok
      done()
    })

    it('should not add duplicates to the store', done => {
      palindromeService.clearPalindromeStore()

      const palindrome = '12321'

      palindromeService.dispatchToPalindromeStore({ palindrome })
      palindromeService.dispatchToPalindromeStore({ palindrome })

      const palindromeStore = palindromeService.getPalindromeStore()

      expect(palindromeStore.length).to.equal(1)
      done()
    })
  })

  describe('trimPalindromeStore', () => {
    it('should remove the last 10 elements of the palindromeStore', done => {
      palindromeService.clearPalindromeStore()

      // Add 12 elements
      for (let i = 0; i < 12; i++) {
        const palindrome = '12321' + String(i)
        palindromeService.dispatchToPalindromeStore({ palindrome })
      }

      palindromeService.trimPalindromeStore()

      const palindromes = palindromeService.getPalindromeStore()

      expect(palindromes.length).to.equal(10)
      done()
    })
  })
})
