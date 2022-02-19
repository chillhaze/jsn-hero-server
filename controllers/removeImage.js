const { Hero } = require('../models')

const removeImage = async (req, res) => {
  const { heroId, imageURL } = req.body
  console.log('heroId and imageURL:', heroId, imageURL)

  if (!heroId) {
    const error = new Error(`Hero id=${heroId}, check req body`)
    error.status = 404
    throw error
  } else if (!imageURL) {
    const error = new Error(`Hero imageURL=${imageURL}, check req body`)
    error.status = 404
    throw error
  }

  const hero = await Hero.findById({ _id: heroId })
  console.log('Found hero', hero)

  if (!hero) {
    const error = new Error(`Hero with id ${heroId} not found`)
    error.status = 404
    throw error
  }

  // const countBefore = await Hero.find({ id: heroId, images: imageURL })
  // console.log('countBefore - ', countBefore)

  const imageDeleted = await Hero.findByIdAndUpdate(
    { _id: heroId },
    {
      $pull: {
        images: imageURL,
      },
    },
  )

  // const countAfter = await Hero.find({ id: heroId, images: imageURL })
  // console.log('countAfter - ', countAfter)

  // Try to find deleted image
  // const findDeletedImage = await Hero.find(
  //   { id: heroId, images: imageURL },
  //   { 'images.$': 1 },
  // )

  // console.log('try to find deleted image - ', findDeletedImage)

  // Message if image was not deleted
  if (!imageDeleted) {
    const error = new Error(`Hero image ${imageURL} not deleted`)
    error.status = 404
    throw error
  }

  const result = await Hero.findById({ _id: heroId })
  console.log(`Hero "${result.nickname}" image deleted`)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = removeImage
