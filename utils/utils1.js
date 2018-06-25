const bcrypt = require('bcryptjs')

const generateHashMin = dependency => password =>
  dependency
    .genSalt(10)
    .then(salt => dependency.hash(password, salt))
    .then(hash => Promise.resolve(hash))
    .catch(err => Promise.reject(err))

const compareHashMin = dependency => (user, password) =>
  dependency
    .compare(password, user.password)
    .then(result => Promise.resolve({ result, user }))
    .catch(err => Promise.reject(err))

const generateHash = generateHashMin(bcrypt)

const compareHash = compareHashMin(bcrypt)

module.exports = {
  generateHash,
  compareHash,
  generateHashMin,
  compareHashMin
}
