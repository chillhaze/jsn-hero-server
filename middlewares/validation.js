const validation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    console.log('validation: ', req.body)

    if (error) {
      error.status = 400

      next(error)
    }

    console.log('validation sucess!')
    next()
  }
}

module.exports = validation
