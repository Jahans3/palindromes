const isPalindrome = ({ palindrome = '' }) => {
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

  return result
}

const safeParse = ({ string }) => {
  try {
    return JSON.parse(string)
  } catch (err) {
    console.log('Error: palindrome service: ', err)
    return false
  }
}

module.exports = {
  isPalindrome,
  safeParse
}
