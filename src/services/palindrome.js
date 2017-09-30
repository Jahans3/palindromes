const uuid = require('uuid/v1')
const moment = require('moment')

const dateFormat = 'MMMM Do YYYY h:mm:ss a'

let palindromeStore = []

const isPalindrome = ({ palindrome = '' } = {}) => {
  if (!palindrome.length) return false

  const removeSpecials = palindrome.replace(/[^A-Za-z]/g, '')
  const lowerCase = removeSpecials.toLowerCase()
  const chars = lowerCase.split('')
  const reversed = [...chars].reverse() // don't mutate chars
  let result = true

  reversed.map((char, i) => {
    if (char !== chars[i]) {
      result = false
    }
  })

  if (result) {
    const noDuplicate = !palindromeStore.find(p => p.palindrome === palindrome)
    noDuplicate && palindromeStore.unshift({
      id: uuid(),
      created: moment().format(dateFormat),
      palindrome
    })

    if (palindromeStore.length > 10) {
      palindromeStore.pop()
    }
  }

  return result
}

const safeParse = ({ string } = {}) => {
  try {
    return JSON.parse(string)
  } catch (err) {
    return false
  }
}

const cleanPalindromeStore = ({ expiry = 10 } = {}) => {
  const tenMinutesAgo = moment().subtract(expiry, 'minutes')
  palindromeStore = palindromeStore.filter(palindrome => {
    const { created } = palindrome
    return moment(created, dateFormat).isAfter(tenMinutesAgo)
  })
}

const getPalindromes = () => {
  return palindromeStore
}

const clearPalindromes = () => {
  palindromeStore = []
}

module.exports = {
  isPalindrome,
  safeParse,
  getPalindromes,
  clearPalindromes,
  cleanPalindromeStore
}
