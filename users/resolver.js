const User = [
  {
    _id: '7379896908',
    userName: 'clare',
    name: 'Clare',
    password: '123456',
    age: 18,
    gender: 'female'
  }
]

const rootResolver = (_, { password }) =>
  User.find(user => user.password === password)

module.exports = { rootResolver }
