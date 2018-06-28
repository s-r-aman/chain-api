require('./database/database')
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const { schema } = require('./graphQL/schema')

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))

app.get('/', (req, res) => {
  res.send('You can make your GraphQL request at <a href="/graphiql">here.</a>')
})

module.exports = app
