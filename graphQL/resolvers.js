const {
  root: { login },
  mutations: { signUp, editProfile }
} = require('./../users/resolver')

const {
  mutations: { addHabit }
} = require('./../habits/resolver')

const { DateTime } = require('./scalarsResolvers')

const resolver = {
  DateTime,
  Query: {
    login
  },
  Mutation: {
    signUp,
    editProfile,
    addHabit
  }
}

const resolvers = [resolver]

module.exports = { resolvers }
