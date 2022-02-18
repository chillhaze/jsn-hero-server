const fs = require('fs/promises')

const ctrlWrapper = controller => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      console.log('ctrlWrapper: ', error)

      if (req.files) {
        req.files.forEach(file => fs.unlink(file.path))
      }

      next(error)
    }
  }
}

module.exports = ctrlWrapper
