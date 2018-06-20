const { makeExecutableSchema } = require('graphql-tools')

const { UserSchema } = require('./../users/schema')
const { HabitSchema } = require('./../habits/schema')
const { ProgressSchema } = require('./../progress/schema')

const { resolvers } = require('./resolvers')

const RootQuery = `
  type Query { 
    login(password: String): User,
    getUser(token: String): User
  },
  type Mutation {
    signUp(
      username: String,
      name: String,
      password: String,
      age: Int,
      gender: String,
    ): User,
  }
`

const typeDefs = [RootQuery, UserSchema, HabitSchema, ProgressSchema]

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { schema }
