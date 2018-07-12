const {
  root: { login },
  mutations: { signUp, editProfile }
} = require('./../users/resolver')

const {
  queries: { getHabit, getAllHabits },
  mutations: { addHabit, updateHabit, deleteHabit, updateProgress }
} = require('./../habits/resolver')

const { DateTime } = require('./scalarsResolvers')

const resolver = {
  DateTime,
  Query: {
    User: login,
    Habit: getHabit
  },
  Mutation: {
    signUp,
    editProfile,
    addHabit,
    updateHabit,
    deleteHabit,
    updateProgress
  },
  User: { habits: getAllHabits }
}

const resolvers = [resolver]

module.exports = { resolvers }
