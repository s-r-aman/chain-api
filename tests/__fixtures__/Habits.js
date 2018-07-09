const faker = require('faker/locale/en_IND')

module.exports = [
  {
    name: faker.name.title(),
    diff_level: 'easy',
    icon: faker.random.word(),
    reminder: new Date(faker.date.future()).toISOString()
  },
  {
    name: faker.name.title(),
    diff_level: 'easy',
    icon: faker.random.word(),
    reminder: new Date(faker.date.future()).toISOString()
  },
  {
    name: faker.name.title(),
    diff_level: 'easy',
    icon: faker.random.word(),
    reminder: new Date(faker.date.future()).toISOString()
  },
  {
    name: faker.name.title(),
    diff_level: 'easy',
    icon: faker.random.word(),
    reminder: new Date(faker.date.future()).toISOString()
  }
]
