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

const signUp = (_, { userName, password, age, gender, name }) => {
  User.push({ userName, password, age, gender, name })
  return User.find(user => user.password === password)
}

const getUser = (_, { token }) =>
  User.find(({ token: authToken }) => token === authToken)

const root = { login, getUser }
const mutations = { signUp }
module.exports = { root, mutations }
