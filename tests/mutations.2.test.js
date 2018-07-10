const request = require('supertest')
const app = require('./../app')

const [firstUser] = require('./__fixtures__/Users')
const [firstHabit] = require('./__fixtures__/Habits')

const [signUpQuery, , , addHabitQuery] = require('./helpers/queries')

const graphql = query =>
  request(app)
    .post('/graphql')
    .send({ query })

describe('Mutations.', () => {
  describe('addHabit', () => {
    test('Add the habit', () =>
      graphql(signUpQuery(firstUser))
        .then(({ body: { data: { signUp } } }) =>
          graphql(addHabitQuery({ token: signUp.token, ...firstHabit }))
        )
        .then(({ body: { data } }) => {
          // FIXME: reminder: new Date(data.addHabit.reminder).toISOString()
          expect({
            ...data.addHabit,
            reminder: new Date(firstHabit.reminder).toISOString()
          }).toMatchObject(firstHabit)
        }))
  })
})
