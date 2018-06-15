const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()
const PORT = process.env.PORT || 5000

app.use('/graphql', bodyParser.json(), graphqlExpress({}))
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))

app.get('/', (req, res) => {
  res.send('You can make your GraphQL request at /graphql')
})

app.listen(PORT, () => console.log(`Server is up -> ${PORT}`))
