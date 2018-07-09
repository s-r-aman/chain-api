const HabitSchema = `
  type Habit {
    id: ID!,
    name: String!,
    diff_level: String!,
    icon: String,
    reminder: String,
    coins: Int!,
    diamonds: Int!,
    completed_dates: [DateTime],
    created_at: DateTime!,
    updated_at: DateTime!,
  }
`

module.exports = { HabitSchema }
