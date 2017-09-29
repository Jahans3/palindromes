const uuid = require('uuid/v1')
const moment = require('moment')

let palindromesStore = []

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
    const noDuplicate = !palindromesStore.find(p => p.palindrome === palindrome)
    noDuplicate && palindromesStore.push({
      id: uuid(),
      created: moment().format('MMMM Do YYYY h:mm:s a'),
      palindrome
    })
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

const getPalindromes = () => {
  const reversed = [...palindromesStore].reverse().slice(0, 10)
  const tenMinutesAgo = moment().subtract(10, 'minutes')
  return reversed.filter(palindrome => {
    const { created } = palindrome
    return moment(created, 'MMMM Do YYYY h:mm:ss a').isAfter(tenMinutesAgo)
  })
}

const clearPalindromes = () => {
  palindromesStore = []
}

module.exports = {
  isPalindrome,
  safeParse,
  getPalindromes,
  clearPalindromes
}
