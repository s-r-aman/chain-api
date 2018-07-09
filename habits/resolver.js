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

const mutations = { addHabit: catchErrors(addHabit) }

module.exports = { mutations }
