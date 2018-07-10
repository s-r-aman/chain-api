const {
  root: { login },
  mutations: { signUp, editProfile }
} = require('./../users/resolver')

const {
  queries: { getHabit },
  mutations: { addHabit, updateHabit, deleteHabit }
} = require('./../habits/resolver')

const { DateTime } = require('./scalarsResolvers')

const resolver = {
  DateTime,
  Query: {
    login,
    getHabit
  },
  Mutation: {
    signUp,
    editProfile,
    addHabit,
    updateHabit,
    deleteHabit
  }
}

const resolvers = [resolver]

module.exports = { resolvers }
