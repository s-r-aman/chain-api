const db = require('./../database/database')
const { generateHash, compareHash } = require('./../utils/utils1')
const { loginMin } = require('./../utils/utils2')

const users = db('users')
const login = loginMin(users, compareHash)

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

const signUp = (_, { username, password, age, gender, name }) =>
  generateHash(password).then(hash =>
    users
      .insert({
        username,
        password: hash,
        age,
        gender,
        name,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning([
        'username',
        'age',
        'gender',
        'name',
        'created_at',
        'updated_at'
      ])
      .then(([firstElement]) => firstElement)
  )

const getUser = (_, { token }) =>
  User.find(({ token: authToken }) => token === authToken)

const root = { login, getUser }
const mutations = { signUp }
module.exports = { root, mutations, login }
