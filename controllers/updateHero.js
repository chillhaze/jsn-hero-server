const { Hero } = require('../models')
const fs = require('fs/promises')
const path = require('path')

const imagesDir = path.join(__dirname, '../', 'public', 'images')

const updateHero = async (req, res) => {
  const body = req.body
  const oldImages = req.body.old_images
  console.log('oldImages', oldImages)

  const heroId = req.params.id

  const images = req.files.map(file => {
    const { path: tempUpload, originalname } = file
    const resultUpload = path.join(imagesDir, originalname)

    // Remove files from temp dir to public/images
    fs.rename(tempUpload, resultUpload)

    const image = path.join('images', originalname)

    return image
  })

  if (typeof oldImages === 'string') {
    images.unshift(oldImages)
  } else {
    images.unshift(...oldImages)
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
    {
      ...body,
      images,
    },
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
