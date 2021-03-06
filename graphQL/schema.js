const { makeExecutableSchema } = require('graphql-tools')

const enums = require('./enums')
const scalars = require('./scalarsDefs')
const { UserSchema } = require('./../users/schema')
const { HabitSchema } = require('./../habits/schema')

const { resolvers } = require('./resolvers')

const RootQuery = `
  type Query { 
    User(username: String!): User,
    Habit(token: String!, id: ID!): Habit,
    Habits(token: String!): [Habit]
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
      name: String!,
      diff_level: DIFFICULTY!,
      icon: String!,
      reminder: DateTime,
    ): Habit,
    updateHabit(
      token: String!,
      id: ID!,
      name: String,
      diff_level: DIFFICULTY,
      icon: String,
      reminder: DateTime,
    ): Habit,
    deleteHabit(
      token: String!,
      id: ID!,
    ): Habit,
    updateProgress(
      token: String!,
      id: ID!,
      coins: Int,
      diamonds: Int,
    ): Habit,
    toggleCompletion(
      token: String!,
      id: ID!,
    ): Habit
  }
`

const typeDefs = [scalars, enums, RootQuery, UserSchema, HabitSchema]

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { schema }
