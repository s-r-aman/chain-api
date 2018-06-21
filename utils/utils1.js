const bcrypt = require('bcryptjs')

const generateHash = password =>
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => Promise.resolve(hash))
    .catch(err => Promise.reject(err))

const compareHash = (user, password) =>
  bcrypt
    .compare(password, user.password)
    .then(result => Promise.resolve({ result, user }))
    .catch(err => Promise.reject(err))

module.exports = { generateHash, compareHash }
