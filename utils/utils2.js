const loginMin = (db, passwordCompareFn) => (_, { username, password }) =>
  db
    .where('username', username)
    .then(([firstElement]) => passwordCompareFn(firstElement, password))
    .then(({ result, user }) => {
      if (!result) {
        return {}
      }
      return user
    })
    .catch(err => {
      throw new Error(err)
    })

module.exports = { loginMin }
