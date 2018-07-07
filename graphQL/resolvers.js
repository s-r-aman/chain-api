const {
  root: { login },
  mutations: { signUp, editProfile }
} = require('./../users/resolver')

const { DateTime } = require('./scalarsResolvers')

const resolver = {
  DateTime,
  Query: {
    login
  },
  Mutation: {
    signUp,
    editProfile
  }
}

const resolvers = [resolver]

module.exports = { resolvers }
