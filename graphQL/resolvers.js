const {
  root: { login },
  mutations: { signUp, editProfile }
} = require('./../users/resolver')

const {
  queries: { getHabit, getAllHabits, getHabitsWithToken },
  mutations: {
    addHabit,
    updateHabit,
    deleteHabit,
    updateProgress,
    toggleCompletion
  }
} = require('./../habits/resolver')

const { DateTime } = require('./scalarsResolvers')

const resolver = {
  DateTime,
  Query: {
    User: login,
    Habit: getHabit,
    Habits: getHabitsWithToken
  },
  Mutation: {
    signUp,
    editProfile,
    addHabit,
    updateHabit,
    deleteHabit,
    updateProgress,
    toggleCompletion
  },
  User: { habits: getAllHabits }
}

const resolvers = [resolver]

module.exports = { resolvers }
