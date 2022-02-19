const { Hero } = require('../models')

const deleteHero = async (req, res) => {
  const { id } = req.params

  const result = await Hero.findByIdAndDelete({ _id: id })
  console.log('is hero deleted? - ', result)

  if (!result) {
    const error = new Error(`Hero with id ${id} not found`)
    error.status = 404
    throw error
  }

  // Message if Hero deleted
  const message = `Hero "${result.nickname}" deleted`
  console.log(message)

  res.status(204).json({
    status: 'success',
    code: 204,
    message: {
      message,
    },
  })
}

module.exports = deleteHero
