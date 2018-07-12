const db = require('./../database/database')
const { catchErrors } = require('./../utils/utils2')

const addHabit = async (
  _,
  {
    token,
    name,
    diff_level,
    icon,
    reminder,
    coins = 0,
    diamonds = 0,
    completed_dates = [],
    created_at = new Date(),
    updated_at = new Date()
  }
) => {
  const [{ username }] = await db('tokens').where({ token })
  const habit = await db('habits').insert(
    {
      username,
      name,
      diff_level,
      icon,
      reminder,
      coins,
      diamonds,
      completed_dates,
      created_at,
      updated_at
    },
    [
      'id',
      'name',
      'diff_level',
      'icon',
      'reminder',
      'coins',
      'diamonds',
      'completed_dates',
      'created_at',
      'updated_at'
    ]
  )
  return { ...habit[0] }
}

const updateHabit = async (
  _,
  { token, id, name, diff_level, icon, reminder, updated_at = new Date() }
) => {
  const [{ username }] = await db('tokens').where({ token })
  const habit = await db('habits')
    .where({ id, username })
    .update(
      {
        username,
        name,
        icon,
        diff_level,
        reminder,
        updated_at
      },
      [
        'id',
        'name',
        'diff_level',
        'icon',
        'reminder',
        'coins',
        'diamonds',
        'completed_dates',
        'created_at',
        'updated_at'
      ]
    )
  return { ...habit[0] }
}

const deleteHabit = async (_, { token, id }) => {
  const [{ username }] = await db('tokens').where({ token })
  const habit = await db('habits')
    .where({ id, username })
    .del([
      'id',
      'name',
      'diff_level',
      'icon',
      'reminder',
      'coins',
      'diamonds',
      'completed_dates',
      'created_at',
      'updated_at'
    ])
  return { ...habit[0] }
}

const getHabit = async (_, { token, id }) => {
  const [{ username }] = await db('tokens').where({ token })
  const habit = await db('habits').where({ id, username })
  return { ...habit[0] }
}

const getAllHabits = ({ username }) => db('habits').where({ username })

const updateProgress = async (
  _,
  { token, id, coins, completed_dates, diamonds }
) => {
  const [{ username }] = await db('tokens').where({ token })
  if (!(coins || completed_dates || diamonds)) {
    throw new Error(
      'Please provide a value to upgrade, all the values to be updated  are empty.'
    )
  }
  const [habit] = await db('habits')
    .where({ username, id })
    .update({ coins, completed_dates, diamonds }, [
      'id',
      'name',
      'diff_level',
      'icon',
      'reminder',
      'coins',
      'diamonds',
      'completed_dates',
      'created_at',
      'updated_at'
    ])
  return habit
}

const queries = {
  getHabit: catchErrors(getHabit),
  getAllHabits: catchErrors(getAllHabits)
}

const mutations = {
  addHabit: catchErrors(addHabit),
  updateHabit: catchErrors(updateHabit),
  deleteHabit: catchErrors(deleteHabit),
  updateProgress: catchErrors(updateProgress)
}

module.exports = { mutations, queries }
