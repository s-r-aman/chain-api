const db = require('./../database/database')

const users = db('users')

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

const login = (_, { password }) => User.find(user => user.password === password)

const signUp = (_, { username, password, age, gender, name }) =>
  users
    .insert({
      username,
      password,
      age,
      gender,
      name,
      created_at: new Date(),
      updated_at: new Date()
    })
    .returning([
      'username',
      'password',
      'age',
      'gender',
      'name',
      'created_at',
      'updated_at'
    ])
    .then(([firstElement]) => firstElement)

const getUser = (_, { token }) =>
  User.find(({ token: authToken }) => token === authToken)

const root = { login, getUser }
const mutations = { signUp }
module.exports = { root, mutations }
