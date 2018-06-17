const HabitSchema = `
  type Habit {
    name: String!,
    difficulty: String!,
    icon: String,
    reminders: [String],
    progress: Progress
  }
`

module.exports = { HabitSchema }
