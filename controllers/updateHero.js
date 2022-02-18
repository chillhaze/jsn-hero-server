const { Hero } = require('../models')
const fs = require('fs/promises')
const path = require('path')

const imagesDir = path.join(__dirname, '../', 'public', 'images')

const updateHero = async (req, res) => {
  const body = req.body
  console.log('body', body)

  const heroId = req.params.id

  console.log('id to update', heroId)

  if (req.files) {
    const images = req.files.map(file => {
      const { path: tempUpload, originalname } = file
      const resultUpload = path.join(imagesDir, originalname)

      // Remove files from temp dir to public/images
      fs.rename(tempUpload, resultUpload)

      const image = path.join('images', originalname)

      return image
    })
  }

  const hero = await Hero.findById({ _id: heroId })
  console.log('Found hero', hero)

  if (!hero) {
    const error = new Error(`Hero with id ${heroId} not found`)
    error.status = 404
    throw error
  }

  const result = await Hero.findByIdAndUpdate(
    {
      _id: heroId,
    },
    body,
    {
      new: true,
    },
  )

  console.log(`Hero "${result.nickname}" updated`)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = updateHero
