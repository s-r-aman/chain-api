const {
  root: { login },
  mutations: { signUp, editProfile }
} = require('./../users/resolver')

const resolver = {
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
