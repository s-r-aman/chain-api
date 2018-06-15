const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

app.use('/graphql', bodyParser.json())

app.get('/', (req, res) => {
  res.send('You can make your GraphQL request at /graphql')
})

app.listen(PORT, () => console.log(`Server is up -> ${PORT}`))
