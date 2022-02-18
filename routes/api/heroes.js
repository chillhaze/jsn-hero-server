const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models')
const { ctrlWrapper, validation, upload } = require('../../middlewares')
const { getHeroes, addHero, updateHero } = require('../../controllers')

// use validation middleware with post/put requests - validation(joiSchema)

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

module.exports = router
