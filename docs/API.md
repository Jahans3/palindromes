# API

All routes relative to `/api/v1`

## Get palindromes
Returns the last 10 palindromes the API has received

* Method: `GET`
* Path: `/palindromes`

#### Response
An array of 10 palindromes ordered chronologically, each palindrome is an object containing a unique ID and a `palindrome` property.

###### Example Response:
```
[
    { id: "9f90914c-a540-11e7-abc4-cec278b6b50a", palindrome: "A but tuba" },
    { id: "9f909912-a540-11e7-abc4-cec278b6b50a", palindrome: "A car, a man, a maraca" },
    { id: "9f909b38-a540-11e7-abc4-cec278b6b50a", palindrome: "A dog, a plan, a canal: pagoda" },
    { id: "9f909cb4-a540-11e7-abc4-cec278b6b50a", palindrome: "A dog! A panic in a pagoda!" },
    { id: "9f909e9e-a540-11e7-abc4-cec278b6b50a", palindrome: "A lad named E. Mandala" },
    { id: "9f90a39e-a540-11e7-abc4-cec278b6b50a", palindrome: "A man, a plan, a canal: Panama." },
    { id: "9f90a57e-a540-11e7-abc4-cec278b6b50a", palindrome: "A man, a plan, a cat, a ham, a yak, a yam, a hat, a canal-Panama!" },
    { id: "9f90a664-a540-11e7-abc4-cec278b6b50a", palindrome: "A new order began, a more Roman age bred Rowena." },
    { id: "9f90a72c-a540-11e7-abc4-cec278b6b50a", palindrome: "A nut for a jar of tuna." },
    { id: "9f90a7ea-a540-11e7-abc4-cec278b6b50a", palindrome: "A Santa at Nasa." },
]
```

## Check if palindrome
Accepts a string and

* Method: `POST`
* Path: `/palindromes`

###### Example Request Body
```
{
    "palindrome": "A but tuba"
}
```

#### Example Response
`true`
