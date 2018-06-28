const request = require('supertest')
const app = require('./../app')
const db = require('./../database/database')

const {
  users: [firstUser]
} = require('./__fixtures__/Users')

const graphql = request(app).post('/graphql')
const usersDB = db('users')
const tokenDB = db('tokens')

const queries = [
  `mutation {
        signUp(
          username: "${firstUser.username}",
          name: "${firstUser.name}",
          password: "${firstUser.password}",
          age: ${firstUser.age},
          gender: "${firstUser.gender}"
        ){
          username,
          name,
          age,
          gender,
          token
        }
      }`
]

afterEach(() => usersDB.delete())

describe('Mutations', () => {
  describe('signUp', () => {
    test('sign the new user up.', () =>
      graphql
        .send({
          query: queries[0]
        })
        .then(({ body: { data: { signUp } } }) =>
          expect({ ...signUp, password: firstUser.password }).toMatchObject(
            firstUser
          )
        ))
    test('return the correct token.', () =>
      graphql
        .send({
          query: queries[0]
        })
        .then(({ body: { data: { signUp } } }) => {
          expect(signUp).toHaveProperty('token')
          return tokenDB
            .where('username', signUp.username)
            .then(([{ token }]) => expect(token).toBe(signUp.token))
        }))
  })
})
