const { makeExecutableSchema } = require('graphql-tools')

const enums = require('./enums')
const scalars = require('./scalarsDefs')
const { UserSchema } = require('./../users/schema')
const { HabitSchema } = require('./../habits/schema')

const { resolvers } = require('./resolvers')

const RootQuery = `
  type Query { 
    login(username: String, password: String): User,
  },
  type Mutation {
    signUp(
      username: String!,
      name: String!,
      password: String!,
      age: Int!,
      gender: String!,
    ): User,
    editProfile(
      token: String!,
      name: String,
      age: Int,
      gender: String,
      currentPassword: String!,
      newPassword: String,
    ): User,
    addHabit(
      token: String!,
      diff_level: DIFFICULTY!,
      icon: String!,
    ): Habit
  }
`

const typeDefs = [scalars, enums, RootQuery, UserSchema, HabitSchema]

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { schema }
