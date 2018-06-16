const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const { typeDefs } = require('./users/Schema')
const { resolvers } = require('./users/resolver')

const app = express()
const PORT = process.env.PORT || 5000

const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))

app.get('/', (req, res) => {
  res.send('You can make your GraphQL request at /graphiql')
})

//  eslint-disable-next-line
app.listen(PORT, () => console.log(`Server is up -> ${PORT}`))
