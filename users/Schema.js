const UserSchema = `
  type User {
    _id: ID,
    username: String!,
    name: String!,
    age: Int!,
    gender: String!,
    habits: [Habit],
    token: String
  }
`

//  TODO: Make gender ENUM

module.exports = { UserSchema }
