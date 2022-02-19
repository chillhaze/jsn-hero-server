const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models')
const { ctrlWrapper, validation, upload } = require('../../middlewares')
const {
  getHeroes,
  addHero,
  updateHero,
  removeImage,
  deleteHero,
} = require('../../controllers')

router.get('/get-all-heroes', ctrlWrapper(getHeroes))

router.post(
  '/create',
  upload.array('images', [, 5]),
  validation(joiSchema),
  ctrlWrapper(addHero),
)

router.put(
  '/update-stats/:id',
  upload.array('images', [, 5]),
  validation(joiSchema),
  ctrlWrapper(updateHero),
)

router.put('/remove-image/:id', ctrlWrapper(removeImage))

router.delete('/delete-hero/:id', ctrlWrapper(deleteHero))

module.exports = router
