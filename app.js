require('./database/database')
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const { schema } = require('./graphQL/schema')

const app = express()
const PORT = process.env.PORT || 5000

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))

app.get('/', (req, res) => {
  res.send('You can make your GraphQL request at <a href="/graphiql">here.</a>')
})

//  eslint-disable-next-line
app.listen(PORT, () => console.log(`Server is up -> ${PORT}`))
