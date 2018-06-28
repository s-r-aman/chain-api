const request = require('supertest')
const app = require('./../app')
const db = require('./../database/database')

const {
  users: [firstUser, secondUser]
} = require('./__fixtures__/Users')

const graphql = query =>
  request(app)
    .post('/graphql')
    .send({ query })

const usersDB = db('users')
const tokenDB = db('tokens')
const query = condition => db('tokens').where(condition)

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
      }`,
  `mutation {
        signUp(
          username: "${secondUser.username}",
          name: "${secondUser.name}",
          password: "${secondUser.password}",
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
afterEach(() => tokenDB.delete())

describe('Mutations', () => {
  describe('signUp', () => {
    test('sign the new user up.', () =>
      graphql(queries[0]).then(({ body: { data: { signUp } } }) =>
        expect({ ...signUp, password: firstUser.password }).toMatchObject(
          firstUser
        )
      ))
    test('return the correct token.', () =>
      graphql(queries[0]).then(({ body: { data: { signUp } } }) => {
        expect(signUp).toHaveProperty('token')
        expect(signUp).not.toHaveProperty('password')
        return query({ username: signUp.username }).then(([{ token }]) => {
          expect(token).toBe(signUp.token)
        })
      }))
    test('give error on giving less arguments.', () =>
      graphql(queries[1]).then(({ body }) =>
        expect(body).toHaveProperty('errors')
      ))
  })
})
