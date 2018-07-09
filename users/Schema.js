const UserSchema = `
  type User {
    _id: ID,
    username: String!,
    name: String!,
    age: Int!,
    gender: String!,
    habits: [Habit],
    token: String,
    created_at: DateTime!,
    updated_at: DateTime!,
  }
`

module.exports = { UserSchema }
