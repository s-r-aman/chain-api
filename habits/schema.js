const HabitSchema = `
  type Habit {
    name: String!,
    difficulty: String!,
    icon: String,
    reminders: [String],
    coins: Int,
    diamonds: Int,
    completed: [String]
  }
`

module.exports = { HabitSchema }
