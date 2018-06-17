const { makeExecutableSchema } = require('graphql-tools')

const { UserSchema } = require('./../users/schema')
const { HabitSchema } = require('./../habits/schema')
const { ProgressSchema } = require('./../progress/schema')

const { resolvers } = require('./resolvers')

const RootQuery = `
  type Query { 
    users(password: String): User,
  }
`

const typeDefs = [RootQuery, UserSchema, HabitSchema, ProgressSchema]

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { schema }
