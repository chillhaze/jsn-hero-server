const { Hero } = require('../models')
// console.log(Hero)

const getHeroes = async (req, res) => {
  // Pagination consts
  const { currentPage, pageItemsLimit } = req.query
  const skip = (currentPage - 1) * pageItemsLimit

  // const result = await Hero.find({})
  const result = await Hero.find({}, '', {
    skip,
    limit: Number(pageItemsLimit),
  }).sort({ createdAt: -1 })

  if (!result) {
    const error = new Error(`Heroes not found.`)
    error.status = 404
    throw error
  }

  // Get Heroes total count
  const count = await Hero.count()

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
      count,
    },
  })
}

module.exports = getHeroes
