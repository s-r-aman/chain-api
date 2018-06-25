const { loginMin } = require('./../utils2.js')

const user = {
  name: 'Alisha',
  username: 'alisha',
  gender: 'female',
  age: 27,
  password: 'veryweakpassword'
}

describe('Utility Functions - 2', () => {
  describe('loginMin', () => {
    const db = jest.fn()
    db.where = jest.fn(() => Promise.resolve([user]))
    const passwordCompareFn = jest.fn(() =>
      Promise.resolve({ result: true, user })
    )
    const passwordCompareFnFalse = jest.fn(() =>
      Promise.resolve({ result: false, user })
    )
    const login = loginMin(db, passwordCompareFn)
    const loginFalse = loginMin(db, passwordCompareFnFalse)
    test('calling the db w/ where method w/ correct args', () =>
      login('_', user).then(() =>
        expect(db.where).toHaveBeenCalledWith('username', user.username)
      ))
    test('calling the passwordCompareFn w/ correct args', () =>
      login('_', user).then(() =>
        expect(passwordCompareFn).toHaveBeenCalledWith(user, user.password)
      ))
    test('return user when result is true', () =>
      login('_', user).then(result => expect(result).toEqual(user)))
    test('return user null when result is false', () =>
      loginFalse('_', user).then(result => expect(result).toEqual({})))
  })
})
