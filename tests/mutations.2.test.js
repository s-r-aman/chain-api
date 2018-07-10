const request = require('supertest')
const app = require('./../app')

const [firstUser] = require('./__fixtures__/Users')
const [firstHabit] = require('./__fixtures__/Habits')

const [
  signUpQuery,
  ,
  ,
  addHabitQuery
  // updateHabitQuery
] = require('./helpers/queries')

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
        .then(({ body: { data, error } }) => {
          if (error) {
            console.log(error)
          }
          // FIXME: reminder: new Date(data.addHabit.reminder).toISOString()
          expect(data.addHabit).toMatchObject({
            ...firstHabit,
            reminder: data.addHabit.reminder
          })
          expect(data.addHabit.id).toBeDefined()
          expect(typeof data.addHabit.id).toBe('string')
        }))
    test('Give error when wrong token is passed.', () =>
      graphql(addHabitQuery({ token: 'token', ...firstHabit })).then(
        ({ body: { data, errors } }) => {
          expect(data.addHabit).toBeNull()
          expect(errors).toBeDefined()
        }
      ))
  })
  // describe('updateHabit', () => {
  //   test('Update the habit.', () => {
  //     graphql(updateHabitQuery)
  //   })
  // })
})
