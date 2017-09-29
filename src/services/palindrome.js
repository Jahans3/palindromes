const uuid = require('uuid/v1')

const palindromesStore = []

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
      palindrome
    })
  }

  return result
}

const safeParse = ({ string } = {}) => {
  try {
    return JSON.parse(string)
  } catch (err) {
    console.log('Error: palindrome service: safeParse: ', err)
    return false
  }
}

const getPalindromes = () => [...palindromesStore].reverse().slice(0, 10)

module.exports = {
  isPalindrome,
  safeParse,
  getPalindromes
}
