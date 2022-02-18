const { Hero } = require('../models')

async function deleteAllHeroes() {
  await Hero.deleteMany({})
  const count = await Hero.count()

  return console.log(`success, all Heroes deleted. Collection count = ${count}`)
}
module.exports = deleteAllHeroes
