const request = require('supertest')
const app = require('./../app')
const db = require('./../database/database')

const {
  users: [firstUser, secondUser, thirdUser]
} = require('./__fixtures__/Users')

const queries = require('./helpers/queries')

const graphql = query =>
  request(app)
    .post('/graphql')
    .send({ query })

const usersDB = db('users')
const tokenDB = db('tokens')
const queryTokens = condition => db('tokens').where(condition)

afterEach(() => usersDB.delete())
afterEach(() => tokenDB.delete())

describe('Mutations', () => {
  describe('signUp', () => {
    test('sign the new user up.', () =>
      graphql(queries[0](firstUser)).then(({ body: { data: { signUp } } }) =>
        expect({ ...signUp, password: firstUser.password }).toMatchObject(
          firstUser
        )
      ))
    test('return the correct token.', () =>
      graphql(queries[0](firstUser)).then(({ body: { data: { signUp } } }) => {
        expect(signUp).toHaveProperty('token')
        expect(signUp).not.toHaveProperty('password')
        return queryTokens({ username: signUp.username }).then(
          ([{ token }]) => {
            expect(token).toBe(signUp.token)
          }
        )
      }))
    test('give error on giving less arguments.', () =>
      graphql(queries[1](secondUser)).then(({ body }) =>
        expect(body).toHaveProperty('errors')
      ))
  })
  describe('editProfile', () => {
    test('sign the new user up.', () =>
      graphql(queries[0](firstUser))
        .then(({ body: { data: { signUp: { token } } } }) =>
          graphql(
            queries[2]({
              token,
              ...thirdUser,
              currentPassword: firstUser.password
              // newPassword: thirdUser.password
            })
          )
        )
        .then(({ body: { data: { editProfile } } }) =>
          expect({
            ...editProfile,
            password: thirdUser.password
          }).toMatchObject(thirdUser)
        ))
  })
})
