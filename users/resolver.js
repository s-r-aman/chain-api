const jwt = require('jsonwebtoken')
const db = require('./../database/database')
const { generateHash, compareHash } = require('./../utils/utils1')
const { loginMin, createTokenMin } = require('./../utils/utils2')

const Users = db('users')
const Tokens = db('tokens')
const login = loginMin(Users, compareHash)
const createToken = createTokenMin({
  dependency: jwt,
  secret: process.env.SECRET
})

const signUp = (_, { username, password, age, gender, name }) =>
  generateHash(password).then(hash =>
    Users.insert({
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
      .then(([firstElement]) => {
        const token = createToken({ payload: firstElement.username })
        return Tokens.insert({ token, username: firstElement.username }).then(
          () => ({ token, ...firstElement })
        )
      })
  )

const editProfile = async (
  _,
  {
    token,
    username: newUsername,
    age,
    gender,
    name,
    currentPassword,
    newPassword
  }
) => {
  let updatedUser
  const data = await db('tokens').where({ token })
  const [firstUser] = await db('users').where({ username: data[0].username })
  const {
    user: { username }
  } = await compareHash(firstUser, currentPassword)

  if (!newPassword) {
    updatedUser = await db('users')
      .where({ username })
      .update(
        {
          username: newUsername,
          age,
          gender,
          name,
          updated_at: new Date()
        },
        ['username', 'name', 'age', 'gender']
      )
  } else {
    updatedUser = await generateHash(newPassword).then(hash =>
      Users.where({ username }).update({
        username: newUsername,
        age,
        gender,
        name,
        password: hash
      })
    )
  }
  const [{ token: newToken }] = await db('tokens')
    .where({ username })
    .update({ username: newUsername }, ['token'])

  return { ...updatedUser[0], token: newToken }
}

const root = { login }
const mutations = { signUp, editProfile }
module.exports = { root, mutations, login }
