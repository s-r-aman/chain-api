const bcrypt = require('bcryptjs')
const {
  generateHash,
  compareHash,
  generateHashMin,
  compareHashMin
} = require('./../utils1')

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

  describe('generateHashMin', () => {
    const password = 'password'
    const salt = 'salt'
    const dependency = jest.fn()
    dependency.genSalt = jest.fn(() => Promise.resolve(salt))
    dependency.hash = jest.fn((password2, salt2) =>
      Promise.resolve(password2 + salt2)
    )
    const generateHashDep = generateHashMin(dependency)
    test('call the genSalt method with number 10.', () =>
      generateHashDep(password).then(() =>
        expect(dependency.genSalt).toHaveBeenCalledWith(10)
      ))
    test('call the hash method with correct args.', () =>
      generateHashDep(password).then(() =>
        expect(dependency.hash).toHaveBeenCalledWith(password, salt)
      ))
    test('return the correct hash.', () =>
      generateHashDep(password).then(hash =>
        expect(hash).toBe(password + salt)
      ))
  })

  describe('compareHashMin', () => {
    const password = 'password'
    const salt = 'salt'
    const hash = password + salt
    const user = { password: hash, name: 'Macy' }
    const dependency = jest.fn()
    dependency.compare = jest.fn((password1, hash1) => {
      if (password1 + salt === hash1) return Promise.resolve(true)
      return Promise.resolve(false)
    })
    const compareHashDep = compareHashMin(dependency)
    test('call the compare method correct args.', () =>
      compareHashDep(user, password).then(() =>
        expect(dependency.compare).toHaveBeenCalledWith(password, hash)
      ))
    test('return result true for correct password.', () =>
      compareHashDep(user, password).then(({ result }) =>
        expect(result).toBe(true)
      ))
    test('return result false for correct password.', () =>
      compareHashDep(user, 'quae').then(({ result }) =>
        expect(result).toBe(false)
      ))
    test('return user.', () =>
      compareHashDep(user, password).then(({ result, user: userLocal }) => {
        expect(result).toBe(true)
        expect(userLocal).toEqual(user)
      }))
  })
})
