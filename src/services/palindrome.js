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
  const result = compareElements({ value: reversed, other: chars })

  if (result) {
    const noDuplicate = !palindromeStore.find(p => p.palindrome === palindrome)
    noDuplicate && palindromeStore.unshift({
      id: uuid(),
      created: moment().format(dateFormat),
      palindrome
    })

    while (palindromeStore.length > 10) {
      palindromeStore.pop()
    }
  }

  return result
}

const compareElements = ({ value = [], other = [] }) => {
  const isArray = (Array.isArray(value) && Array.isArray(other))
  const equalLengths = (value.length === other.length)

  if (!isArray || !equalLengths) return false

  let result = true

  value.map((el, i) => {
    if (el !== other[i]) {
      result = false
    }
  })

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
  compareElements,
  safeParse,
  getPalindromes,
  clearPalindromes,
  cleanPalindromeStore
}
