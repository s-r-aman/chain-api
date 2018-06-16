const User = [
  {
    _id: 7379896908,
    userName: 'clare',
    name: 'Clare',
    age: 18,
    gender: 'female'
  }
]
const resolvers = {
  Query: {
    users: (_, args) => {
      User.find(({ _id }) => {
        console.log(_id, args._id)
        return _id === args._id
      })
      return User.find(({ _id }) => _id === args._id)
    }
  }
}

module.exports = { resolvers }
