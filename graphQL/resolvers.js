const {
  root: { login, getUser },
  mutations: { signUp }
} = require('./../users/resolver')

const resolver = {
  Query: {
    login,
    getUser
  },
  Mutation: {
    signUp
  }
}

const resolvers = [resolver]

module.exports = { resolvers }
