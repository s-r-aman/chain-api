const { rootResolver } = require('./../users/resolver')

const resolver = {
  Query: {
    users: rootResolver
  }
}

const resolvers = [resolver]

module.exports = { resolvers }
