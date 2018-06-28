const { name, internet } = require('faker')

const users = [
  {
    username: internet.userName(),
    name: name.firstName(),
    password: internet.password(),
    age: 19,
    gender: 'male'
  },
  {
    username: internet.userName(),
    name: name.firstName(),
    password: internet.password(),
    age: 30,
    gender: 'female'
  },
  {
    username: internet.userName(),
    name: name.firstName(),
    password: internet.password(),
    age: 40,
    gender: 'undisclosed'
  },
  {
    username: internet.userName(),
    name: name.firstName(),
    password: internet.password(),
    age: 50,
    gender: 'other'
  }
]

module.exports = { users }
