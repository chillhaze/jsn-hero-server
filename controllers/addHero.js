const { Hero } = require('../models')
const fs = require('fs/promises')
const path = require('path')

const imagesDir = path.join(__dirname, '../', 'public', 'images')

const addHero = async (req, res) => {
  const body = req.body

  // Removing images
  const images = req.files.map(file => {
    const { path: tempUpload, originalname } = file
    const resultUpload = path.join(imagesDir, originalname)

    // Remove files from temp dir to public/images
    fs.rename(tempUpload, resultUpload)

    const image = path.join('images', originalname)

    return image
  })

  // Check if hero already exists
  const hero = await Hero.findOne({ nickname: req.body.nickname })
  if (hero) {
    const error = new Error(
      `Hero with nickname ${req.body.nickname} already exist`,
    )
    error.status = 404
    throw error
  }

  // Create new Hero
  const result = await Hero.create({ ...body, images })

  console.log(`Hero "${req.body.nickname}" created`)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = addHero
