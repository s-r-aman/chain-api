const jwt = require('jsonwebtoken')
const db = require('./../database/database')
const { generateHash, compareHash } = require('./../utils/utils1')
const { loginMin, createTokenMin, catchErrors } = require('./../utils/utils2')

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
  { token, age, gender, name, currentPassword, newPassword }
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
          age,
          gender,
          name,
          updated_at: new Date()
        },
        ['username', 'name', 'age', 'gender']
      )
  } else {
    const hash = await generateHash(newPassword)
    updatedUser = await db('users')
      .where({ username })
      .update(
        {
          age,
          gender,
          name,
          password: hash,
          updated_at: new Date()
        },
        ['username', 'name', 'age', 'gender']
      )
  }

  const [{ token: newToken }] = await db('tokens').where({ username })

  return { ...updatedUser[0], token: newToken }
}

const root = { login }
const mutations = { signUp, editProfile: catchErrors(editProfile) }
module.exports = { root, mutations, login }
