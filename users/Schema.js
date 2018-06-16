const typeDefs = `
  type Query { users(_id: ID): User}
  type User {
    _id: ID,
    userName: String,
    name: String,
    age: Int,
    gender: String,
    habits: [ID]
  }
`

//  TODO: Make gender ENUM

module.exports = { typeDefs }
