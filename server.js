const app = require('./app')

const PORT = 5000 || process.env.PORT

//  eslint-disable-next-line
app.listen(PORT, () => console.log(`Server is up -> ${PORT}`))
