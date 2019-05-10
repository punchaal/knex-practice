require('dotenv').config()
const knex = require('knex')
const ArticlesService = require('./blogful-scripts/articles-service')

const knexInstance = knex({
  client: 'pg',
  connection: "postgresql://dunder-mifflin@localhost:5433/knex-practice",
})

console.log(ArticlesService.getAllArticles())