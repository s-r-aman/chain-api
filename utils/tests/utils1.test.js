const bcrypt = require('bcryptjs')
const { generateHash, compareHash } = require('./../utils1')

describe('Utility Functions - 1', () => {
  describe('generateHash', () => {
    const password = 'samplePassword'
    test('Generate the hash of string type', () =>
      generateHash(password).then(hash => expect(typeof hash).toBe('string')))
    test('Generate the correct hash.', () =>
      generateHash(password)
        .then(hash => bcrypt.compare(password, hash))
        .then(result => expect(result).toBe(true)))
  })

  describe('compareHash', () => {
    const password = 'samplePassword'
    test('Return true for correct password.', () =>
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash =>
          bcrypt
            .compare(password, hash)
            .then(result =>
              compareHash({ password: hash }, password).then(response =>
                expect(result).toBe(response.result)
              )
            )
        ))
  })
})
